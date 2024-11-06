import { Directive, HostBinding, input } from '@angular/core';

@Directive({
  selector: '[appSpace]',
  standalone: true,
})
export class SpaceDirective {
  size = input.required<number>({
    alias: 'appSpace',
  });

  @HostBinding('style.width.px')
  get getWidth() {
    return this.size();
  }

  @HostBinding('style.height.px')
  get getHeight() {
    return this.size();
  }
}
