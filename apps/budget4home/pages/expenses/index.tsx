import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { B4hHeader } from '../../components/header';

interface ExpensesProps {
  pokemons: string;
}

export default function Expenses(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <h5>Expenses</h5>
      <B4hHeader />
      <br></br>
      {props.pokemons}
    </>
  );
}

export const getServerSideProps: GetServerSideProps<ExpensesProps> = async context => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?offset=20&limit=20', { cache: 'force-cache' });

  return {
    props: {
      pokemons: JSON.stringify(await response.json())
    }
  };
};
