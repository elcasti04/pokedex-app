import { useEffect, useState } from 'react';
import axios from 'axios';

type Pokemon = {
	id: number;
	name: string;
	image: string;
	types: string[];
};

type Type = {
	slot: number;
	type: {
		name: string;
		url: string;
	};
};

export default function Item({ url }: { url: string }) {
	const [pokemon, setPokemon] = useState<Pokemon | null>(null);

	useEffect(() => {
		axios
			.get(url)
			.then((res) => {
				setPokemon({
					id: res.data.id,
					name: res.data.name,
					image: res.data.sprites.other['official-artwork'].front_default,
					types: res.data.types.map((type: Type) => type.type.name),
				});
			})
			.catch((err) => console.error(err));
	}, [url]);

	if (!pokemon) return <p>cargando...</p>;

	return (
		<div className="bg-blue-300 p-4 border-4 rounded">
			<div className="w-32 h-32 mx-auto mb-2 rounded-full overflow-hidden flex items-center justify-center bg-blue-800">
				<img
					src={pokemon.image}
					alt=""
					className="w-full h-full object-contain"
				/>
			</div>
			<p className="text-center font-bold">
				#{pokemon.id.toString().padStart(4, '0')}
			</p>
			<h2 className="text-center text-2xl font-bold capitalize mb-4">
				{pokemon.name}
			</h2>

			<div className="flex gap-4 justify-center">
				{pokemon.types.map((t) => (
					<span
						key={t}
						className="bg-black/40 rounded-4xl py-1 px-4 text-white capitalize"
					>
						{t}
					</span>
				))}
			</div>
		</div>
	);
}
