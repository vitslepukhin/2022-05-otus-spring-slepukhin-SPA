import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'spring-boot-front';
  swaggerHref = `http://localhost:8080/swagger-ui/index.html`;
}
