

import Task from "views/Task";



const dashboardRoutes = [
 
  {
    path: "/user",
    name: "Task",
    icon: "nc-icon fa fa-home",
    component: Task,
    layout: "/admin",
  },  
];

export default dashboardRoutes;
