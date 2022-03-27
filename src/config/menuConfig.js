/**
 * icon:Menu item icon
 * roles:Indicates that the current menu item can be displayed under the role, if this option is not written, it indicates that the menu item is fully open, and it is displayed under any role.
 */
const menuList = [
  {
    title: "front page",
    path: "/dashboard",
    icon: "home",
    roles: ["admin", "editor", "guest"],
  },
  // {
  //   title: "Author blog",
  //   path: "/doc",
  //   icon: "file",
  //   roles: ["admin", "editor", "guest"],
  // },
  // {
  //   title: "Guide pages",
  //   path: "/guide",
  //   icon: "key",
  //   roles: ["admin", "editor"],
  // },
  // {
  //   title: "Permission test",
  //   path: "/permission",
  //   icon: "lock",
  //   children: [
  //     {
  //       title: "Permission description",
  //       path: "/permission/explanation",
  //       roles: ["admin"],
  //     },
  //     {
  //       title: "Admin page",
  //       path: "/permission/adminPage",
  //       roles: ["admin"],
  //     },
  //     {
  //       title: "Guest page",
  //       path: "/permission/guestPage",
  //       roles: ["guest"],
  //     },
  //     {
  //       title: "Editor page",
  //       path: "/permission/editorPage",
  //       roles: ["editor"],
  //     },
  //   ],
  // },
  // {
  //   title: "Assembly",
  //   path: "/components",
  //   icon: "appstore",
  //   roles: ["admin", "editor"],
  //   children: [
  //     {
  //       title: "Welfare text",
  //       path: "/components/richTextEditor",
  //       roles: ["admin", "editor"],
  //     },
  //     {
  //       title: "markdown",
  //       path: "/components/Markdown",
  //       roles: ["admin", "editor"],
  //     },
  //     {
  //       title: "Drag and drop list",
  //       path: "/components/draggable",
  //       roles: ["admin", "editor"],
  //     },
  //   ],
  // },
  // {
  //   title: "chart",
  //   path: "/charts",
  //   icon: "area-chart",
  //   roles: ["admin", "editor"],
  //   children: [
  //     {
  //       title: "Keyboard chart",
  //       path: "/charts/keyboard",
  //       roles: ["admin", "editor"],
  //     },
  //     {
  //       title: "line chart",
  //       path: "/charts/line",
  //       roles: ["admin", "editor"],
  //     },
  //     {
  //       title: "Mixed chart",
  //       path: "/charts/mix-chart",
  //       roles: ["admin", "editor"],
  //     },
  //   ],
  // },
  // {
  //   title: "Routing nested",
  //   path: "/nested",
  //   icon: "cluster",
  //   roles: ["admin", "editor"],
  //   children: [
  //     {
  //       title: "Menu 1",
  //       path: "/nested/menu1",
  //       children: [
  //         {
  //           title: "Menu 1-1",
  //           path: "/nested/menu1/menu1-1",
  //           roles: ["admin", "editor"],
  //         },
  //         {
  //           title: "Menu 1-2",
  //           path: "/nested/menu1/menu1-2",
  //           children: [
  //             {
  //               title: "Menu 1-2-1",
  //               path: "/nested/menu1/menu1-2/menu1-2-1",
  //               roles: ["admin", "editor"],
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   title: "sheet",
  //   path: "/table",
  //   icon: "table",
  //   roles: ["admin", "editor"],
  // },
  // {
  //   title: "excel",
  //   path: "/excel",
  //   icon: "file-excel",
  //   roles: ["admin", "editor"],
  //   children: [
  //     {
  //       title: "Export Excel",
  //       path: "/excel/export",
  //       roles: ["admin", "editor"],
  //     },
  //     {
  //       title: "Upload EXCEL",
  //       path: "/excel/upload",
  //       roles: ["admin", "editor"],
  //     },
  //   ],
  // },
  // {
  //   title: "zip",
  //   path: "/zip",
  //   icon: "file-zip",
  //   roles: ["admin", "editor"],
  // },
  // {
  //   title: "Clipboard",
  //   path: "/clipboard",
  //   icon: "copy",
  //   roles: ["admin", "editor"],
  // },
  // {
  //   title: "User Management",
  //   path: "/user",
  //   icon: "usergroup-add",
  //   roles: ["admin"],
  // },
  // {
  //   title: "About author",
  //   path: "/about",
  //   icon: "user",
  //   roles: ["admin", "editor", "guest"],
  // },
  // {
  //   title: "BUG collection",
  //   path: "/bug",
  //   icon: "bug",
  //   roles: ["admin"],
  // },
];
export default menuList;
