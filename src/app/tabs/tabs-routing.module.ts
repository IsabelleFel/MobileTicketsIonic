import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'totem',
        loadChildren: () => import('../pages/totem/totem.module').then(m => m.TotemPageModule)
      },
      {
        path: 'painel',
        loadChildren: () => import('../pages/painel/painel.module').then(m => m.PainelPageModule)
      },
      {
        path: 'atendente',
        loadChildren: () => import('../pages/atendente/atendente.module').then(m => m.AtendentePageModule)
      },
      {
        path: 'relatorios',
        loadChildren: () => import('../pages/relatorios/relatorios.module').then(m => m.RelatoriosPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/totem',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/totem',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
