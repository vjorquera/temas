import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SharedDashboardComponent } from '../shared-dashboard/shared-dashboard';

@Component({
  selector: 'app-chile-dashboard',
  imports: [SharedDashboardComponent],
  templateUrl: './chile-dashboard.html',
  styleUrl: './chile-dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChileDashboard {

}
