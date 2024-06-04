import { Component, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabContentComponent } from '../tab-content/tab-content.component';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements AfterContentInit {
  @ContentChildren(TabContentComponent) tabs!: QueryList<TabContentComponent>;
  selectedIndex: number = 0;

  ngAfterContentInit() {
    if (this.tabs.length > 0) {
      this.selectTab(this.selectedIndex);
    }
  }

  selectTab(index: number) {
    this.selectedIndex = index;
    this.tabs.toArray().forEach((tab, i) => {
      tab.active = i === index;
    });
  }
}
