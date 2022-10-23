import cn from "classnames";
import { EXAMPLE_PATH } from "../../lib/constants";
import Container from "./container";

export default function Alert({ preview }) {
    if (!preview) return null;
    return (
        <div
            className={cn("border-b", {
                "bg-accent-7 border-accent-7 text-slate-800": preview,
                "bg-accent-1 border-accent-2": !preview,
            })}
        >
            <Container>
                <div className="py-2 text-center text-sm">
                    <>
                        This is a page preview.{" "}
                        <a
                            href="/api/exit-preview"
                            className="underline hover:text-slate-400 duration-200 transition-colors"
                        >
                            Click here
                        </a>{" "}
                        to exit preview mode.
                    </>
                </div>
            </Container>
        </div>
    );
}
