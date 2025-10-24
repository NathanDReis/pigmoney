import { 
  DrawerSceneWrapper, 
  Header, 
  Container 
} from '@/components';

export default function Home() {
 return (
    <DrawerSceneWrapper>
      <Container>
        <Header />
      </Container>
    </DrawerSceneWrapper>
  );
}