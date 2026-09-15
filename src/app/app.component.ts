import { Component } from '@angular/core';
import { GirasPageComponent } from './components/giras-page/giras-page.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GirasPageComponent, FooterComponent],
  template: `
    <app-giras-page></app-giras-page>
    <app-footer></app-footer>
  `,
})
export class AppComponent{

}
