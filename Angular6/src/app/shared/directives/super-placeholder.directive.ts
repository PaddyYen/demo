import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[superPlaceholder]'
})
export class SuperPlaceholderDirective {

  @Input() superPlaceholder: any[];

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
      const sp = new SuperPlaceholder({
        placeholders: this.superPlaceholder,
        preText: "Eg. ",
        stay: 1000,
        speed: 100,
        element: this.el.nativeElement
      });
      sp.init();
  }
}

export function SuperPlaceholder(options) {  
  this.options = options;
  this.element = options.element
  this.placeholderIdx = 0;
  this.charIdx = 0;

  this.setPlaceholder = function() {
      let placeholder = options.placeholders[this.placeholderIdx];
      var placeholderChunk = placeholder.substring(0, this.charIdx+1);
      if (this.element instanceof String) {
        this.element = document.querySelector(this.element)
          .setAttribute("placeholder", this.options.preText + " " + placeholderChunk)
      }
      this.element.setAttribute("placeholder", this.options.preText + " " + placeholderChunk)
  };
  
  this.onTickReverse = function(afterReverse) {
    if (this.charIdx === 0) {
      afterReverse.bind(this)();
      clearInterval(this.intervalId); 
      this.init(); 
    } else {
      this.setPlaceholder();
      this.charIdx--;
    }
  };
  
  this.goReverse = function() {
      clearInterval(this.intervalId);
      this.intervalId = setInterval(this.onTickReverse.bind(this, function() {
        this.charIdx = 0;
        this.placeholderIdx++;
        if (this.placeholderIdx === options.placeholders.length) {
          // end of all placeholders reached
          this.placeholderIdx = 0;
        }
      }), this.options.speed)
  };
  
  this.onTick = function() {
      var placeholder = options.placeholders[this.placeholderIdx];
      if (this.charIdx === placeholder.length) {
        // end of a placeholder sentence reached
        setTimeout(this.goReverse.bind(this), this.options.stay);
      }
      
      this.setPlaceholder();
    
      this.charIdx++;
    }
  
  this.init = function() {
    this.intervalId = setInterval(this.onTick.bind(this), this.options.speed);
  }
  
  this.kill = function() {
    clearInterval(this.intervalId); 
  }
}



