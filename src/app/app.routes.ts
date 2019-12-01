import { Routes, RouterModule } from '@angular/router'
import { BusquedaComponent } from './components/busqueda/busqueda.component'
import { HistorialComponent } from './components/historial/historial.component'

const ROUTES:Routes = [
    { path: 'busqueda', component: BusquedaComponent },
    { path: 'historial', component: HistorialComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'busqueda' }
]

export const APP_ROUTING = RouterModule.forRoot(ROUTES,{useHash:true})