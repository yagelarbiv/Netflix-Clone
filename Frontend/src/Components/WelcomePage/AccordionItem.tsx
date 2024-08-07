import "./Accordion.css";

type Item = {
  id: number;
  header: string;
  body: string;
  open: boolean;
};
type Toggle = (id: number) => void
function AccordionItem({ item, toggle, selected }: { item: Item; toggle: Toggle; selected: number }) {


  return (
    <div className="Item">
      <div className="title" onClick={() => toggle(item.id)}>
        <h2>{item.header}</h2>
        <span>{selected === item.id ? "-" : "+"}</span>
      </div>
      <div className={`content ${selected === item.id ? "open" : "close"}`}>
        {item.body}
      </div>
    </div>
  );
}

export default AccordionItem;
