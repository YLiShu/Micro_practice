import './App.css';
import { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link, Routes, Route } from 'react-router-dom';
import routes from './routes';
import Home from './pages/Home';

const { Header, Content, Sider, Footer } = Layout;

function App() {

  const currentPath = window.location.pathname;

  const [selectedPath, setSelectedPath] = useState(
    routes.find(item => currentPath.includes(item.path))?.path || ''
  )

  const _wr = function (type: string) {
    const orig = (window as any).history[type];
    return function (this: any) {
      const rv = orig.apply(this, arguments);
      const e: any = new Event(type);
      e.arguments = arguments;
      window.dispatchEvent(e);
      return rv;
    }
  }

  window.history.pushState = _wr('pushState');

  // 在这个函数中做跳转后的逻辑
  const bindHistory = () => {
    const currentPath = window.location.pathname;
    setSelectedPath(
      routes.find(item => currentPath.includes(item.key))?.key || ''
    );
  }

  // 绑定事件
  window.addEventListener('pushState', bindHistory)

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
      >
        <img src="https://cdn.poizon.com/node-common/MDA1JTIwQXBwJUU1JTg2JTg1JUU2JTg5JTkzJUU1JUJDJTgwbG9nb0AzeDE1NzY1NjIyMzgyMzU=.png" alt="" className='page-logo' />
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={['main-app']}
          selectedKeys={[selectedPath || 'main-app']}
          onClick={({ key }) => setSelectedPath(key)}
        >
          {
            routes.filter((item) => item.showMenu).map(route => {
              return (
                <Menu.Item key={route.key}>
                  <Link to={route.path}>
                    {route.title}
                  </Link>
                </Menu.Item>
              );
            })
          }
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }} />
        <Content style={{ margin: '5px', height: '100%', background: '#fff' }} >
          {/* 主应用渲染区域 */}
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>

          {/* 子应用渲染区域 */}
          <div id='micro-app'></div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>得物 ©2023 Created by 得物</Footer>
      </Layout>
    </Layout >
  );
}

export default App;
