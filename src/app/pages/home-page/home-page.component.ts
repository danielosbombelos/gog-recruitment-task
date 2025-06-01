import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageLayoutComponent } from '@app/shared/layout/page-layout/page-layout.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [PageLayoutComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {}
