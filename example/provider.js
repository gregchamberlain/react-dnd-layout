import React, { Component, PropTypes } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Image from './components/image';
import Title from './components/title';
import Text from './components/text';

// import Layout, { Wrapper } from '../src';
import Layout from '../src/stateless_layout_container';
import LayoutProvider from '../src/layout_provider';
import { Row, Column } from '../src';
// const component = {
//   type: 'Column',
//   id: 1,
//   props: {
//     row: false,
//     children: []
//   }
// };

const items = [{"type":"Column","id":"57e7274f1d928300007361c3","props":{"children":[{"type":"Row","id":"57e727531d928300007361c6","props":{"children":[{"type":"Text","id":"57e7275d1d928300007361cc","props":{"style":{"flex":0,"fontSize":16,"fontWeight":"bold","boxSizing":"border-box","padding":10,"textAlign":"inherit","color":"inherit","textShadow":"inherit"},"content":"HOME"}},{"type":"Text","id":"57e7275c1d928300007361cb","props":{"style":{"flex":0,"fontSize":16,"fontWeight":"normal","boxSizing":"border-box","padding":10,"textAlign":"inherit","color":"inherit","textShadow":"inherit"},"content":"BLOG"}},{"type":"Text","id":"57e7275b1d928300007361ca","props":{"style":{"flex":1,"fontSize":16,"fontWeight":"normal","boxSizing":"border-box","padding":10,"textAlign":"inherit","color":"inherit","textShadow":"inherit"},"content":""}},{"type":"Text","id":"57e727591d928300007361c9","props":{"style":{"flex":0,"fontSize":16,"fontWeight":"normal","boxSizing":"border-box","padding":10,"textAlign":"inherit","color":"inherit","textShadow":"inherit"},"content":"ABOUT"}},{"type":"Text","id":"57e727571d928300007361c8","props":{"style":{"flex":0,"fontSize":16,"fontWeight":"normal","boxSizing":"border-box","padding":10,"textAlign":"inherit","color":"inherit","textShadow":"inherit"},"content":"CONTACT"}}],"style":{"flex":1,"display":"flex","backgroundSize":"cover","backgroundPosition":"center","background":"transparent","padding":10,"textAlign":"inherit","color":"inherit","fontSize":16,"textShadow":"inherit","fontFamily":"inherit"}}},{"type":"Title","id":"57e727551d928300007361c7","props":{"style":{"flex":1,"fontWeight":"bold","padding":60,"textAlign":"center","boxSizing":"border-box","margin":0,"color":"inherit","textShadow":"inherit"},"content":"Page Title"}}],"style":{"flex":1,"display":"block","backgroundSize":"cover","backgroundPosition":"center","background":"url(http://www.w3schools.com/css/trolltunga.jpg)","padding":10,"textAlign":"inherit","color":"white","fontSize":16,"textShadow":"0 0 10px black","fontFamily":"roboto"}}},{"type":"Row","id":"57e727501d928300007361c4","props":{"children":[{"type":"Column","id":"57e727d81d928300007361cd","props":{"children":[{"type":"Title","id":"57e727de1d928300007361cf","props":{"style":{"flex":1,"fontWeight":"bold","padding":10,"textAlign":"inherit","boxSizing":"border-box","margin":0,"color":"inherit","textShadow":"inherit"},"content":"Article Title"}},{"type":"Text","id":"57e727e01d928300007361d0","props":{"style":{"flex":1,"fontSize":16,"fontWeight":"normal","boxSizing":"border-box","padding":10,"textAlign":"inherit","color":"inherit","textShadow":"inherit"},"content":"In vehicula, risus ut consectetur suscipit, magna neque dignissim nunc, sit amet placerat felis libero vel tortor. Praesent venenatis ex libero, a porta arcu vehicula nec. Nullam placerat posuere odio. Nullam sed nibh luctus, tincidunt leo ut, tincidunt odio. Vestibulum vitae posuere urna. Mauris erat dolor, consequat tincidunt justo ac, blandit lobortis neque. Cras a fringilla lacus. Quisque a dolor elit. Sed et leo neque. Donec efficitur a ipsum a ultrices. Fusce metus erat, fringilla nec sagittis nec, hendrerit nec diam. Donec nec eros in orci pellentesque viverra nec vitae erat.\n\nSuspendisse quis turpis pellentesque, hendrerit lorem sed, consequat eros. Aliquam dui enim, dignissim ac risus id, dignissim fermentum enim. Pellentesque eget purus iaculis, euismod purus sed, consequat augue. Vivamus nec sapien porttitor, varius risus vitae, vulputate lorem. Proin vel magna ante. Nam at ipsum metus. Proin ullamcorper sem vel metus molestie, feugiat sagittis arcu elementum. Donec id leo accumsan, viverra felis vitae, auctor odio. Nam non commodo magna, ut dictum nisl. Morbi tristique viverra auctor. Curabitur blandit, ex eget pellentesque finibus, ligula lacus interdum metus, et volutpat erat turpis nec libero. Fusce ullamcorper, enim sit amet euismod pellentesque, sem libero placerat orci, non laoreet velit urna ac tellus. Phasellus tellus magna, commodo vitae augue et, lobortis posuere tellus. Etiam in tellus erat. Ut vitae tellus augue."}}],"style":{"flex":1,"display":"block","backgroundSize":"cover","backgroundPosition":"center","background":"transparent","padding":20,"textAlign":"inherit","color":"inherit","fontSize":16,"textShadow":"inherit","fontFamily":"inherit"}}},{"type":"Image","id":"57e727d91d928300007361ce","props":{"style":{"flex":1,"background":"url(http://www.jqueryscript.net/images/Simplest-Responsive-jQuery-Image-Lightbox-Plugin-simple-lightbox.jpg)","backgroundPosition":"center","backgroundSize":"cover","boxSizing":"border-box","width":"auto","height":"auto","minWidth":64,"minHeight":64,"borderRadius":0}}}],"style":{"flex":1,"display":"flex","backgroundSize":"cover","backgroundPosition":"center","background":"transparent","padding":20,"textAlign":"inherit","color":"inherit","fontSize":16,"textShadow":"inherit","fontFamily":"roboto"}}},{"type":"Row","id":"57e727511d928300007361c5","props":{"children":[{"type":"Column","id":"57e728191d928300007361d3","props":{"children":[{"type":"Text","id":"57e7281c1d928300007361d4","props":{"style":{"flex":1,"fontSize":16,"fontWeight":"bold","boxSizing":"border-box","padding":10,"textAlign":"inherit","color":"inherit","textShadow":"inherit"},"content":"Company"}}],"style":{"flex":1,"display":"block","backgroundSize":"cover","backgroundPosition":"center","background":"transparent","padding":20,"textAlign":"inherit","color":"inherit","fontSize":16,"textShadow":"inherit","fontFamily":"inherit"}}},{"type":"Column","id":"57e728171d928300007361d2","props":{"children":[{"type":"Text","id":"57e7281f1d928300007361d5","props":{"style":{"flex":1,"fontSize":16,"fontWeight":"bold","boxSizing":"border-box","padding":10,"textAlign":"inherit","color":"inherit","textShadow":"inherit"},"content":"Products"}}],"style":{"flex":1,"display":"block","backgroundSize":"cover","backgroundPosition":"center","background":"transparent","padding":20,"textAlign":"inherit","color":"inherit","fontSize":16,"textShadow":"inherit","fontFamily":"inherit"}}},{"type":"Column","id":"57e728141d928300007361d1","props":{"children":[{"type":"Text","id":"57e728221d928300007361d6","props":{"style":{"flex":1,"fontSize":16,"fontWeight":"bold","boxSizing":"border-box","padding":10,"textAlign":"inherit","color":"inherit","textShadow":"inherit"},"content":"Services"}}],"style":{"flex":1,"display":"block","backgroundSize":"cover","backgroundPosition":"center","background":"transparent","padding":20,"textAlign":"inherit","color":"inherit","fontSize":16,"textShadow":"inherit","fontFamily":"inherit"}}}],"style":{"flex":1,"display":"flex","backgroundSize":"cover","backgroundPosition":"center","background":"#333","padding":20,"textAlign":"center","color":"#eee","fontSize":16,"textShadow":"inherit","fontFamily":"roboto"}}}];

const comps = {
  Text,
  Row,
  Column,
  Image,
  Title,
};


class StatelessExample extends Component {

  render() {
    return (
      <LayoutProvider items={items} components={comps} locked onChange={i => console.log(i)}/>
    );
  }
}

export default StatelessExample;
