import { MenuHamburguer } from "../../components/Buttons/menuHamburguer.tsx";
import DefaultLayout from "../../layouts/defaultLayout.tsx";
import TableQuote from "../../sections/tableQuote.tsx";

function QuotePage() {
  return (
    <DefaultLayout site="Citas">
      <TableQuote />
      <MenuHamburguer />
    </DefaultLayout>
  );
}
export default QuotePage;
