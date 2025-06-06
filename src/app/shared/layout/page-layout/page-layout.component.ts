import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-page-layout',
  standalone: true,
  imports: [],
  templateUrl: './page-layout.component.html',
  styleUrl: './page-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageLayoutComponent {}
