import { Button } from "@/components/ui/button";
import { MessageType } from "../types";

function App() {
  const handleShowReviews = async () => {
    await browser.runtime.sendMessage({
      messageType: MessageType.SHOW_UI,
    });
  };

  return (
    <div className="h-full min-h-screen p-4 flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Amazon reviews</h1>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione,
        suscipit! Voluptates laborum, eius esse voluptate nisi assumenda tempore
        autem quaerat aspernatur! Sint magni aut nobis tempora alias eius vel
        totam!
      </p>
      <div className="flex flex-col gap-4 nmt-10">
        <Button className="cursor-pointer" onClick={handleShowReviews}>
          Show reviews
        </Button>
        <Button disabled></Button>
        <Button disabled></Button>
        <Button disabled></Button>
      </div>
    </div>
  );
}

export default App;
