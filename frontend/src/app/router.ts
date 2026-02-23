import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import LoginPage from '@/modules/auth/LoginPage.vue'
import DashboardPage from '@/modules/dashboard/DashboardPage.vue'
import EntitiesPage from '@/modules/entities/EntitiesPage.vue'
import UsersPage from '@/modules/admin/UsersPage.vue'
import DirectionsPage from '@/modules/directions/DirectionsPage.vue'
import SamplesPage from '@/modules/samples/SamplesPage.vue'
import ProtocolsPage from '@/modules/protocols/ProtocolsPage.vue'
import ResultsPage from '@/modules/results/ResultsPage.vue'
import ConclusionsPage from '@/modules/conclusions/ConclusionsPage.vue'
import TestsPage from '@/modules/tests/TestsPage.vue'
import DoctorsPage from '@/modules/doctors/DoctorsPage.vue'
import BranchesPage from '@/modules/branches/BranchesPage.vue'
import LabsPage from '@/modules/labs/LabsPage.vue'
import ResearchGoalsPage from '@/modules/research-goals/ResearchGoalsPage.vue'
import SampleTargetsPage from '@/modules/sample-targets/SampleTargetsPage.vue'
import SampleTypesPage from '@/modules/sample-types/SampleTypesPage.vue'
import IndicatorsPage from '@/modules/indicators/IndicatorsPage.vue'
import ProtocolTypesPage from '@/modules/protocol-types/ProtocolTypesPage.vue'
import StatusesPage from '@/modules/statuses/StatusesPage.vue'
import UserTypesPage from '@/modules/user-types/UserTypesPage.vue'
import { useAuthStore } from '@/modules/auth/auth.store'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      component: AuthLayout,
      meta: { public: true },
      children: [
        {
          path: '',
          name: 'login',
          component: LoginPage,
          meta: { public: true }
        }
      ]
    },
    {
      path: '/',
      component: MainLayout,
      meta: { requiresAuth: true },
      children: [
        { path: '', redirect: '/dashboard' },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: DashboardPage,
          meta: { requiresAuth: true, resource: 'dashboard', action: 'view' }
        },
        {
          path: 'directions',
          name: 'directions',
          component: DirectionsPage,
          meta: { requiresAuth: true, resource: 'directions', action: 'view' }
        },
        {
          path: 'samples',
          name: 'samples',
          component: SamplesPage,
          meta: { requiresAuth: true, resource: 'samples', action: 'view' }
        },
        {
          path: 'protocols',
          name: 'protocols',
          component: ProtocolsPage,
          meta: { requiresAuth: true, resource: 'protocols', action: 'view' }
        },
        {
          path: 'results',
          name: 'results',
          component: ResultsPage,
          meta: { requiresAuth: true, resource: 'results', action: 'view' }
        },
        {
          path: 'conclusions',
          name: 'conclusions',
          component: ConclusionsPage,
          meta: { requiresAuth: true, resource: 'conclusions', action: 'view' }
        },
        {
          path: 'tests',
          name: 'tests',
          component: TestsPage,
          meta: { requiresAuth: true, resource: 'tests', action: 'view' }
        },
        {
          path: 'doctors',
          name: 'doctors',
          component: DoctorsPage,
          meta: { requiresAuth: true, resource: 'doctors', action: 'view' }
        },
        {
          path: 'branches',
          name: 'branches',
          component: BranchesPage,
          meta: { requiresAuth: true, resource: 'branches', action: 'view' }
        },
        {
          path: 'labs',
          name: 'labs',
          component: LabsPage,
          meta: { requiresAuth: true, resource: 'labs', action: 'view' }
        },
        {
          path: 'research-goals',
          name: 'research-goals',
          component: ResearchGoalsPage,
          meta: { requiresAuth: true, resource: 'research-goals', action: 'view' }
        },
        {
          path: 'sample-targets',
          name: 'sample-targets',
          component: SampleTargetsPage,
          meta: { requiresAuth: true, resource: 'sample-targets', action: 'view' }
        },
        {
          path: 'sample-types',
          name: 'sample-types',
          component: SampleTypesPage,
          meta: { requiresAuth: true, resource: 'sample-types', action: 'view' }
        },
        {
          path: 'indicators',
          name: 'indicators',
          component: IndicatorsPage,
          meta: { requiresAuth: true, resource: 'indicators', action: 'view' }
        },
        {
          path: 'protocol-types',
          name: 'protocol-types',
          component: ProtocolTypesPage,
          meta: { requiresAuth: true, resource: 'protocol-types', action: 'view' }
        },
        {
          path: 'statuses',
          name: 'statuses',
          component: StatusesPage,
          meta: { requiresAuth: true, resource: 'statuses', action: 'view' }
        },
        {
          path: 'user-types',
          name: 'user-types',
          component: UserTypesPage,
          meta: { requiresAuth: true, resource: 'user-types', action: 'view' }
        },
        {
          path: 'objects',
          name: 'objects',
          component: EntitiesPage,
          meta: { requiresAuth: true, resource: 'objects', action: 'view' }
        },
        {
          path: 'resobjects',
          redirect: '/objects'
        },
        {
          path: 'entities',
          redirect: '/objects'
        },
        {
          path: 'users-registry',
          redirect: '/admin/users'
        },
        {
          path: 'admin/users',
          name: 'users',
          component: UsersPage,
          meta: { requiresAuth: true, resource: 'users', action: 'view' }
        }
      ]
    }
  ]
})

router.beforeEach(async (to) => {
  const auth = useAuthStore()
  if (!auth.initialized) {
    await auth.restoreSession()
  }
  if (to.meta.public) {
    return true
  }
  if (!auth.isAuthenticated) {
    return { path: '/login' }
  }
  const resource = to.meta.resource as string | undefined
  const action = to.meta.action as string | undefined
  if (resource && action && !auth.can(resource as any, action as any)) {
    return { path: '/dashboard' }
  }
  return true
})

export default router
