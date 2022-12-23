import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { B4hHeader } from '../../components/header';

interface LabelsProps {
  pokemons: string;
}

export default function Labels(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <h5>Labels</h5>
      <B4hHeader />
      <br></br>
      {props.pokemons}
    </>
  );
}

export const getServerSideProps: GetServerSideProps<LabelsProps> = async context => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?offset=20&limit=20', { cache: 'force-cache' });

  return {
    props: {
      pokemons: JSON.stringify(await response.json())
    }
  };
};
