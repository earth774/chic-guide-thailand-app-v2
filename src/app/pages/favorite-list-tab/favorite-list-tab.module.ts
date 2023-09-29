import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FavoriteListTabPage } from './favorite-list-tab';
import { SharedModule } from '../../shared.module';
 
@NgModule({
  declarations: [
    FavoriteListTabPage,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: FavoriteListTabPage
      }
    ])
  ]
})
export class FavoriteListTabPageModule {}
