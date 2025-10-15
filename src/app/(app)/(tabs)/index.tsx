import { 
  DrawerSceneWrapper, 
  Header, 
  Container 
} from '@/src/components';

export default function App() {
 return (
    <DrawerSceneWrapper>
      <Container>
        <Header />
      </Container>
    </DrawerSceneWrapper>
  );
}