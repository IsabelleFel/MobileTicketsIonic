import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'totem',
    loadChildren: () => import('./pages/totem/totem.module').then( m => m.TotemPageModule)
  },
  {
    path: 'painel',
    loadChildren: () => import('./pages/painel/painel.module').then( m => m.PainelPageModule)
  },
  {
    path: 'atendente',
    loadChildren: () => import('./pages/atendente/atendente.module').then( m => m.AtendentePageModule)
  },
  {
    path: 'relatorios',
    loadChildren: () => import('./pages/relatorios/relatorios.module').then( m => m.RelatoriosPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
