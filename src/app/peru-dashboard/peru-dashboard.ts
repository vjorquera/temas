import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SharedDashboardComponent } from '../shared-dashboard/shared-dashboard';

@Component({
  selector: 'app-peru-dashboard',
  imports: [SharedDashboardComponent],
  templateUrl: './peru-dashboard.html',
  styleUrl: './peru-dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeruDashboard {

}
