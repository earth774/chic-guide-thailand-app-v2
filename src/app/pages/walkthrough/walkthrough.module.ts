import { NgModule } from '@angular/core';
import { WalkthroughPage } from './walkthrough';
import { SwiperModule } from 'swiper/angular';
import { SharedModule } from 'src/app/shared.module';
 
@NgModule({
  declarations: [
    WalkthroughPage,
  ],
  imports: [
    SharedModule,
    SwiperModule
  ],
})
export class WalkthroughPageModule {}
