import {
  Directive,
  ElementRef,
  HostListener,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType, DomPortal, TemplatePortal } from '@angular/cdk/portal';
import { BehaviorSubject } from 'rxjs';

import { TooltipComponent } from '../components';
import { TOOLTIP_CONTENT, TOOLTIP_POSITIONS } from '../const';
import { TooltipPosition } from '../models';

@Directive({
  selector: '[tTooltip]',
})
export class TooltipDirective implements OnInit, OnDestroy {
  private overlayRef!: OverlayRef;
  private tooltipInjector!: Injector;
  private isHidden = true;
  private tpl$ = new BehaviorSubject<TemplateRef<any> | ComponentType<any> | HTMLElement | null>(null);
  private data$ = new BehaviorSubject<any>(null);
  private currPortal!: DomPortal<HTMLElement> | TemplatePortal<any> | ComponentPortal<any>;

  @Input() set tlpTemplate(tpl: TemplateRef<any> | ComponentType<any> | HTMLElement) {
    this.tpl$.next(tpl);
  }
  @Input('tTooltip') set tooltipData(data: any) {
    this.data$.next(data);
  }
  @Input('tlpTemplateContext') tplContext: any;
  @Input('tlpPosition') position: TooltipPosition = 'below';

  constructor(
    private elRef: ElementRef<HTMLElement>,
    private injector: Injector,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
  ) {}

  ngOnInit(): void {
    console.log('Init');
    this.init();

    this.tpl$.subscribe((tpl) => this.setPortal(tpl));
  }

  ngOnDestroy(): void {
    this.hide();
  }

  private setPortal = (tpl: TemplateRef<any> | ComponentType<any> | HTMLElement | null): any => {
    switch (true) {
      case !tpl:
        return (this.currPortal = new ComponentPortal(TooltipComponent, null, this.tooltipInjector));
      case tpl instanceof TemplateRef:
        return (this.currPortal = new TemplatePortal(tpl as TemplateRef<any>, this.viewContainerRef, this.tplContext));
      case tpl instanceof HTMLElement:
        return (this.currPortal = new DomPortal(tpl as HTMLElement));
      default:
        this.currPortal = new ComponentPortal(tpl as ComponentType<any>, this.viewContainerRef, this.tooltipInjector);
    }
  };

  private init(): void {
    this.tooltipInjector = Injector.create({
      providers: [
        {
          provide: TOOLTIP_CONTENT,
          useValue: this.data$,
        },
      ],
      parent: this.injector,
    });
  }

  @HostListener('mouseenter')
  display(): void {
    this.overlayRef = this.overlay.create({
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(this.elRef)
        .withPositions([TOOLTIP_POSITIONS[this.position]]),
    });

    this.overlayRef.attach(this.currPortal);
  }

  @HostListener('mouseleave')
  hide(): void {
    this.overlayRef?.dispose();
  }

  toggle(): void {
    this.isHidden ? this.display() : this.hide();
  }
}
