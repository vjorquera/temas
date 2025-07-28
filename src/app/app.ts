import { Component, OnInit, Renderer2, inject } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

const domains: any = { 'ccsqa.andesmotor.cl': { logo: 'assets/images/logoAndes.png', themeClass: 'fury-default', prefijo: 'CL' }, 'ccscoga.andesmotor.cl': { logo: 'assets/images/logoDive.png', themeClass: 'fury-dark', prefijo: 'CO' }, 'ccspeqa.andesmotor.cl': { logo: 'assets/images/logoDivePe.jpg', themeClass: 'fury-light', prefijo: 'PE' }, 'default': { logo: 'assets/images/logoAndes.png', themeClass: 'fury-default', prefijo: 'CL' } };

const themeClasses = ['fury-default', 'fury-dark', 'fury-light', 'fury-flat'];

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  private renderer = inject(Renderer2);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const hostname = window.location.hostname;
      const config = domains[hostname] || domains['default'];

      // Determine the country prefix from the route
      let countryPrefix = config.prefijo; // Default to domain config prefix
      let route = this.activatedRoute;
      while (route.firstChild) {
        route = route.firstChild;
      }
      const path = route.snapshot.url[0]?.path;
      if (path && ['cl', 'co', 'pe'].includes(path)) {
          countryPrefix = path.toUpperCase();
      }

      // Find the theme class based on the country prefix
      let currentThemeClass = domains['default'].themeClass;
      for (const domainKey in domains) {
          if (domains[domainKey].prefijo === countryPrefix) {
              currentThemeClass = domains[domainKey].themeClass;
              break;
          }
      }

      themeClasses.forEach(cls => this.renderer.removeClass(document.body, cls));
      this.renderer.addClass(document.body, currentThemeClass);
    });

    // Apply theme on initial load as well
    const hostname = window.location.hostname;
    const config = domains[hostname] || domains['default'];
    themeClasses.forEach(cls => this.renderer.removeClass(document.body, cls));
    this.renderer.addClass(document.body, config.themeClass);
  }
}
