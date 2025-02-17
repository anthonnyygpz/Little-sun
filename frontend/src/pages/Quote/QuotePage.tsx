import { MenuHamburguer } from "../../components/Buttons/MenuHamburguer.tsx";
import DefaultLayout from "../../layouts/DefaultLayout.tsx";
import TableQuote from "../../sections/TableQuote.tsx";

function QuotePage() {
  return (
    <DefaultLayout>
      <TableQuote />
      <MenuHamburguer />
    </DefaultLayout>
  );
}
export default QuotePage;
