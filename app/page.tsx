import Image from "next/image";
import { database } from "@/db/database";
import { bids as bidSchema } from "@/db/schema";
import { revalidatePath } from "next/cache";

export default async function Home() {
  const bids = await database.select().from(bidSchema);

  const createBid = async (formData: FormData) => {
    "use server";
    await database.insert(bidSchema).values({});
    revalidatePath("/");
  };

  return (
    <main className="container mx-auto">
      <form action={createBid}>
        <input type="number" placeholder="Bid" />
        <button type="submit">Place Bid</button>
      </form>

      {bids.map((bid) => (
        <div>{bid.id}</div>
      ))}
    </main>
  );
}
