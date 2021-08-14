import { App } from 'vue'

// Stylesheets
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

// Plugins
import PrimeVue from 'primevue/config'

// Directives
import Tooltip from 'primevue/tooltip'

// Services
import ToastService from 'primevue/toastservice'

// Components
import Avatar from 'primevue/avatar'
import AvatarGroup from 'primevue/avatargroup'
import Autocomplete from 'primevue/autocomplete'
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import Chip from 'primevue/chip'
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import Dialog from 'primevue/dialog'
import Divider from 'primevue/divider'
import InlineMessage from 'primevue/inlinemessage'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import OverlayPanel from 'primevue/overlaypanel'
import Password from 'primevue/password'
import Panel from 'primevue/panel'
import ProgressSpinner from 'primevue/progressspinner'
import ScrollPanel from 'primevue/scrollpanel'
import Toast from 'primevue/toast'
import Toolbar from 'primevue/toolbar'

export default (app: App) => {
  // Install Services
  app.use(ToastService)
  // Install Plugins
  app.use(PrimeVue, { ripple: true })
  // Install Directives
  app.directive('tooltip', Tooltip)
  // Install Components
  app.component('Avatar', Avatar)
  app.component('AvatarGroup', AvatarGroup)
  app.component('Autocomplete', Autocomplete)
  app.component('Button', Button)
  app.component('Checkbox', Checkbox)
  app.component('Chip', Chip)
  app.component('Column', Column)
  app.component('DataTable', DataTable)
  app.component('Dialog', Dialog)
  app.component('Divider', Divider)
  app.component('InlineMessage', InlineMessage)
  app.component('InputText', InputText)
  app.component('Message', Message)
  app.component('OverlayPanel', OverlayPanel)
  app.component('Password', Password)
  app.component('Panel', Panel)
  app.component('ProgressSpinner', ProgressSpinner)
  app.component('ScrollPanel', ScrollPanel)
  app.component('Toast', Toast)
  app.component('Toolbar', Toolbar)
}
