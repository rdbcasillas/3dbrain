import BrainViz from './components/BrainViz.vue'
import TabList from './components/TabList.vue'
import BrainMulViz from './components/BrainMulViz.vue'
import BrainList from './components/BrainList.vue'
import Methods from '@/components/Methods.vue';
import Software from '@/components/Software.vue';
//import SelectModule from './components/SelectModule.vue'
import SelectType from './components/SelectType.vue'
import Home from '@/components/Home.vue';

export const routes = [
  {path: '/jupyter', name: 'brainviz', component: BrainViz,props:true},
  {path: '/methods', name: 'methods', component: Methods},
  {path: '/software', name: 'software', component: Software},
  {path: '/tablist', name: 'tablist', component: TabList,props:true},
  {path: '/cervical', name: 'cervical', component: BrainList,props:true},
  {path: '/cervical/:id', name: 'cervicalbrain', component: BrainMulViz,props:true},
  {path: '/injured', name: 'injured', component: BrainList,props:true},
  {path: '/injured/:id', name: 'injuredbrain', component: BrainMulViz,props:true},
  {path: '/lumbar', name: 'lumbar', component: BrainList,props:true},
  {path: '/lumbar/:id', name: 'lumbarbrain', component: BrainMulViz,props:true},
  {path: '/lowlumbar', name: 'lowlumbar', component: BrainList,props:true},
  {path: '/lowlumbar/:id', name: 'lowlumbarbrain', component: BrainMulViz,props:true},
  {path: '/thoracic', name: 'thoracic', component: BrainList,props:true},
  {path: '/thoracic/:id', name: 'thoracicbrain', component: BrainMulViz,props:true},
  {path: '/brainlist', name: 'brainlist', component: BrainList,props:true},
  //{path: '/', name: 'select', component: SelectModule},
  {path: '/', name: 'home', component: Home},
  {path: '/selecttype', name: 'selecttype', component: SelectType},
]