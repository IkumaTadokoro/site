import { Link } from "@remix-run/react";
import { Coffee } from "lucide-react";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";

export const BuyMeACoffee = () => {
  return (
    <Alert>
      <Coffee className="h-6 w-6 stroke-yellow-800 " />
      <div className="flex justify-between items-center gap-x-2">
        <section className="mt-2">
          <h3 className="text-lg mb-2 font-semibold leading-none tracking-tight">
            Buy me a Coffee!
          </h3>
          <AlertDescription>
            ドメイン代や自己研鑽のために使わせていただきます！
          </AlertDescription>
        </section>
        <Button variant="outline" asChild size="sm" className="mt-2">
          <Link
            to="https://www.buymeacoffee.com/ikuma"
            target="_blank"
            title="buy me a coffee"
          >
            <Coffee className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </Alert>
  );
};
