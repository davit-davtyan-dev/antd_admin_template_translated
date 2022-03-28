<p align = "center">
   <a href="https://nlrx-wjc.github.io/react-antd-admin-template/" target="_blank">
      <img src = "./ Logo.png" />
   </a>
</ p>

# Introduction

[React-ANTD-ADMIN-TEMPLATE] (https://nlrx-wjc.github.io/react-antd-admin-template/) is a background management system template based on `React` and` Ant Design` It built a typical business model such as user login / logout, dynamic routing, permission check, user management, can help you quickly build a prototype of enterprise-level background product, which is the choice for your lively living.

The development inspiration of this system comes from [Vue-Element-Admin] (https://github.com/panjiachen/vue-element-admin/), this is an excellent background management system template based on `Vue` and` Elementui` , Pay tribute to the big 佬 here!

In fact, my primary technology stack has always been `Vue`, just recently entered the pit`, watched a long-month document, just try the cattle knife, haha. There is not that sentence: The best way to check the learning results is the wave. So, make such a wheel, haha. For `react`, I am a small white, there is definitely a good place in the project, welcome you to mention the` PR` or `Issue`.

- [Online Preview] (https://nlrx-wjc.github.io/react-antd-admin-template)
- [Gitee Online Preview (domestic users can access this address)] (https://nlrx.gitee.io/react-antd-admin-template/)
- [Development Document] (https://nlrx-wjc.github.io/react-antd-admin-template-doc/) is currently in full preparation ...

# Function

`` ``
- Login / Logout

- ASD
  - Page permission
  - Routing permissions

- Global function
  - Dynamic sidebar (support multi-level routing nested)
  Dynamic breadcrumbs
  - Local / backend MOCK data
  - Screenfull full screen
  - Adaptive shrink sidebar

- editor
  - rich text
  - MarkDown

- Excel
  - Export Excel
  - Import Excel
  - Front-end visualization Excel

- ZIP
  - Export ZIP

- Error page
  - 404

- Components
  - Drag and drop list

- sheet
- Dashboard
- Guide pages
- echarts chart
- Clipboard
`` `

# Directory Structure

`` ``
├─ public # static resources
│ ├─ Favicon.ico # favicon icon
│ └─ INDEX.html # HTML Template
├─ SRC # project source code
│ ├─ API # All requests
│ ├─ askASTS # picture fonts and other static resources
│ ├─Components # Global Public Components
│ ├─ Config # Global Configuration
│ │ ├─MenuConfig.js # Navigation menu configuration
│ │ └─ RouteMap.js # Routing Configuration
│ ├─Lib # third party library on-demand loading
│ ├─ Mock # project MOCK analog data
│ ├─NORE # Global Store Management
│ ├─STYLES # global style
│ ├─ utils # global utility
│ ├─ Views # views all pages
│ ├─ app.js # Entry page
│ ─ defaultSettings.js # Global default configuration
│ └─index.js # Source Entrance
├─.env.development # Develop environment variable configuration
├─.env.Production # Production environment variable configuration
├── Config-Overrides.js # for CRA's WebPack Custom Configuration
├── Deploy.sh # CI Deployment Script
├─- .travis.yml # Automated CI configuration
└── package.json # package.json
`` `

# Install

`` `shell
# Project project
Git clone https://github.com/nlrx-wjc/react-antd-admin-template.git

# Go to the project directory
CD React-ANTD-Admin-Template

# Install dependence
NPM INSTALL

# Switch Taobao source, solve the problem of slow download speed of npm
NPM Install --Registry = https: //registry.npm.taobao.org

# Enable service service service
NPM START
`` `

Automatically open the browser access [http:// localhost: 3000] (http: // localhost: 3000), you see the following page is successful.

! [] (./ guide.gif)

Next you can modify the code for business development.

# About the author

Hello everyone, I am hard to cool.

At the end of the South Mountain, a farmer, the teacher from the director Wang Zhongyang, loves to code, advocating the open source spirit, and is happy to share.

In 2005, it was served in the Southeastern Woods of the People's Liberation Army, served as a sniper.

In 2008, he was invited by Russia Alpha, and taught his team members to teach his team members to learn the theory of socialism with Chinese characteristics and Mao Zedong Thought.

In 2011, the president of the United States was asked, and the heart was shining, and all the honors were put down, and they were in the mountains.

In 2015, he was entrusted by the director Wang Zhongyang to develop incense management system for the Taoism.

I like to toss and engage in machine, pursue fresh technology.

Below is my WeChat, welcome to the trees (TREE) wind (BEE)! ! !

! [] (./ wechat.jpg)

# Encourage the author

As a personal developer, it is not easy to maintain an open source. If you feel that this project is a little help, please help some Star ~~
If you have more than a lift, thank you very much for your appreciation, your appreciation is your greatest recognition and encouragement.

! [] (./ pay.png)