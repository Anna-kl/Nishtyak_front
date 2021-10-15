import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeOneComponent } from './components/pages/home-one/home-one.component';
import { HomeTwoComponent } from './components/pages/home-two/home-two.component';
import { HomeThreeComponent } from './components/pages/home-three/home-three.component';
import { AboutComponent } from './components/pages/about/about.component';
import { CategoriesComponent } from './components/pages/categories/categories.component';
import { ServicesComponent } from './components/pages/services/services.component';
import { ServicesDetailsComponent } from './components/pages/services-details/services-details.component';
import { BlogComponent } from './components/pages/blog/blog.component';
import { BlogDetailsComponent } from './components/pages/blog-details/blog-details.component';
import { FoodCollectionComponent } from './components/pages/food-collection/food-collection.component';
import { OnlineOrderComponent } from './components/pages/online-order/online-order.component';
import { ChefsComponent } from './components/pages/chefs/chefs.component';
import { BookTableComponent } from './components/pages/book-table/book-table.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { CheckoutComponent } from './components/pages/checkout/checkout.component';
import { ComingSoonComponent } from './components/pages/coming-soon/coming-soon.component';
import { TermsConditionsComponent } from './components/pages/terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './components/pages/privacy-policy/privacy-policy.component';
import { ErrorComponent } from './components/pages/error/error.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { FaqComponent } from './components/pages/faq/faq.component';
import {AccountComponent} from './components/pages/account/account.component';
import {AddressComponent} from './components/pages/address/address.component';

const routes: Routes = [
    {path: '', component: HomeTwoComponent},
    // {path: 'home-two', component: HomeTwoComponent},
    // {path: 'home-three', component: HomeThreeComponent},
    {path: 'about', component: AboutComponent},
    {path: 'categories', component: CategoriesComponent},
    {path: 'services', component: ServicesComponent},
    {path: 'services-details', component: ServicesDetailsComponent},
    {path: 'blog', component: BlogComponent},
    {path: 'blog-details', component: BlogDetailsComponent},
    {path: 'food-collection', component: FoodCollectionComponent},
    {path: 'online-order', component: OnlineOrderComponent},
    {path: 'chefs', component: ChefsComponent},
    {path: 'account/:param', component: AccountComponent},
    {path: 'faq', component: FaqComponent},
    {path: 'book-table', component: BookTableComponent},
    {path: 'cart', component: CartComponent},
    {path: 'address', component: AddressComponent},
    {path: 'checkout', component: CheckoutComponent},
    {path: 'coming-soon', component: ComingSoonComponent},
    {path: 'terms-conditions', component: TermsConditionsComponent},
    {path: 'privacy-policy', component: PrivacyPolicyComponent},
    {path: 'error', component: ErrorComponent},
    {path: 'contact', component: ContactComponent},
    {path: '**', component: ErrorComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
