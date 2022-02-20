import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType, TemplatePortal } from '@angular/cdk/portal';
import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { EMPTY_VIEW_VALUE_ERROR, MENU_DATA, getPositions } from '../const';
import { MenuPosition, MenuRef } from '../models';

type MenuView = TemplateRef<any> | ComponentType<any>;
type MenuPortal = TemplatePortal<any> | ComponentPortal<any>;

@Directive({
  selector: '[tMenuTrigger]',
})
export class MenuTriggerDirective implements OnInit, OnDestroy {
  private overlayRef!: OverlayRef;
  private menuRef = new MenuRef();
  private unsubscribe = new Subject<void>();

  @Input('tMenuTrigger') view!: MenuView;
  @Input('menuData') data: any;
  @Input('menuPosition') position: MenuPosition = 'below';

  @Output() afterClose = new EventEmitter<any>();

  constructor(
    private elRef: ElementRef<HTMLElement>,
    private injector: Injector,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
  ) {}

  ngOnInit(): void {
    this.menuRef.onClose.pipe(takeUntil(this.unsubscribe)).subscribe((value) => {
      this.afterClose.emit(value);
      this.closeMenu();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  closeMenu(): void {
    this.overlayRef.dispose();
  }

  @HostListener('click', ['$event'])
  openMenu(event: Event): void {
    this.overlayRef = this.createOverlay();
    this.overlayRef.attach(this.getPortal());
    event.stopPropagation();
  }

  private createInjector(menuRef: MenuRef, data: any): Injector {
    return Injector.create({
      providers: [
        {
          provide: MenuRef,
          useValue: menuRef,
        },
        {
          provide: MENU_DATA,
          useValue: data,
        },
      ],
      parent: this.injector,
    });
  }

  private createPortal(view: MenuView, viewContainerRef: ViewContainerRef, injector: Injector): MenuPortal {
    return view instanceof TemplateRef
      ? new TemplatePortal(view, viewContainerRef)
      : new ComponentPortal(view, viewContainerRef, injector);
  }

  private getPortal(): MenuPortal {
    if (!this.view) throw Error(EMPTY_VIEW_VALUE_ERROR);
    const injector = this.createInjector(this.menuRef, this.data);
    return this.createPortal(this.view, this.viewContainerRef, injector);
  }

  private createOverlay(): OverlayRef {
    const overlayRef = this.overlay.create({
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(this.elRef)
        .withPositions(getPositions(this.position)),
      hasBackdrop: true,
      backdropClass: 'transparent-backdrop',
    });
    overlayRef
      .backdropClick()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((event: MouseEvent) => {
        const hasBackdropCloseValue = typeof this.menuRef.backdropCloseValue !== 'undefined';
        this.menuRef.close(hasBackdropCloseValue ? this.menuRef.backdropCloseValue : event);
      });
    return overlayRef;
  }
}
