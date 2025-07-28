import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SharedDashboardComponent } from '../shared-dashboard/shared-dashboard';

@Component({
  selector: 'app-colombia-dashboard',
  imports: [SharedDashboardComponent],
  templateUrl: './colombia-dashboard.html',
  styleUrl: './colombia-dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColombiaDashboard {

}
