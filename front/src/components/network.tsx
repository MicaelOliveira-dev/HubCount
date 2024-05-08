import Link from "./Link";
import Title from "./Title";
import Cinema from "assets/cinema.jpg";
const Network = () => {
  return (
    <>
      <section className="flex flex-col gap-y-4 w-full">
        <Title bold center={false} green={false} message="Crie o seu Network" />
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between w-full h-auto md:h-[400px]">
          <div className="w-full self-start font-semibold flex flex-col gap-y-4 px-4">
            <p className="max-w-lg text-bodyColor">
              Construa a sua própria rede de cinéfilos. Nosso recurso do chat é
              o lugar perfeito para você se conectar com amantes de filmes que
              compartilham de seus gostos e paixões cinematográficas. Faça novas
              amizades, discuta seus filmes favoritos e descubra recomendações
              emocionates.
            </p>
            <div className="flex flex-row items-center gap-4">
              <Link to="" onlyBorder={false}>Veja Todos os Filmes</Link>
              <Link to="" onlyBorder>Buscar Por Cinéfilos</Link>
            </div>
          </div>
          <div className="relative h-full w-full">
            <img
              src={Cinema}
              className="object-cover w-full h-full rounded-lg bg-none shadow-md"
            />
            <div className="bg-black absolute inset-0 h-full w-full z-10 opacity-50 rounded-lg" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Network;
