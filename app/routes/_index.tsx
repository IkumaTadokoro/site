import type { V2_MetaFunction } from "@remix-run/cloudflare";
import { css } from "styled-system/css";
import { container, flex, grid, vstack } from "styled-system/patterns";
import Footer from "~/components/footer";
import NavBar from "~/components/navbar";
import {
  AWSIcon,
  GoIcon,
  GraphQLIcon,
  JavaScriptIcon,
  MUIIcon,
  RailsIcon,
  ReactIcon,
  RubyIcon,
  TailwindIcon,
  TypeScriptIcon,
  VueIcon,
} from "~/icons";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "ikuma-t.com" },
    { name: "description", content: "移行作業中" },
  ];
};

export default function Index() {
  return (
    <div
      className={grid({
        gridTemplateRows: "auto 1fr auto",
        minHeight: "100vh",
      })}
    >
      <NavBar />
      <div
        className={container({
          paddingY: { base: 2, md: 6, lg: 8 },
          maxWidth: "2xl",
        })}
      >
        <section
          className={vstack({
            paddingY: {
              base: 12,
              md: 24,
              lg: 36,
            },
          })}
        >
          <h2
            className={css({
              textStyle: {
                base: "3xl",
                md: "4xl",
                lg: "5xl",
              },
              fontWeight: "bold",
              color: "zinc.800",
            })}
          >
            Hi 👋! I'm ikuma-t.
          </h2>
          <p
            className={css({
              textStyle: "sm",
              color: "zinc.600",
            })}
          >
            Tabun... Frontend Engineer
          </p>
        </section>
        <div className={grid({ gap: 12 })}>
          <section className={grid({ gap: 4 })}>
            <h2
              className={css({
                textStyle: {
                  base: "2xl",
                  lg: "3xl",
                },
                fontWeight: "bold",
                color: "zinc.800",
              })}
            >
              <span
                className={css({
                  borderBottom: "3px dotted",
                  borderColor: "zinc.300",
                })}
              >
                About me
              </span>
            </h2>
            <div
              className={grid({
                color: "zinc.800",
                lineHeight: "tall",
                fontWeight: 500,
                fontSize: "md",
                gap: 4,
              })}
            >
              <p>
                都内のFintechスタートアップで働くプログラマです。最近興味があるのは刺繍で、自分でハンカチに動物とか縫えたらいいなと思っています。
              </p>
              <p>
                1年前くらいまではパンをよく焼いていましたが、最近はもっぱらパンケーキを焼いています。豆腐とラムダークをいれるのがこだわりです。
              </p>
            </div>
          </section>
          <section className={grid({ gap: 4 })}>
            <h2
              className={css({
                textStyle: {
                  base: "2xl",
                  lg: "3xl",
                },
                fontWeight: "bold",
                color: "zinc.800",
              })}
            >
              <span
                className={css({
                  borderBottom: "3px dotted",
                  borderColor: "zinc.300",
                })}
              >
                Technology Stack
              </span>
            </h2>
            <div
              className={grid({
                color: "zinc.800",
                lineHeight: "tall",
                fontWeight: 500,
                fontSize: "md",
                gap: 4,
              })}
            >
              <div
                className={flex({
                  gap: 2,
                  alignItems: "end",
                  flexWrap: "wrap",
                })}
              >
                <TypeScriptIcon />
                <JavaScriptIcon />
                <ReactIcon />
                <VueIcon />
                <TailwindIcon />
                <MUIIcon />
                <GraphQLIcon />
                <GoIcon />
                <RubyIcon />
                <RailsIcon />
                <AWSIcon />
              </div>
            </div>
          </section>
          <section className={grid({ gap: 4 })}>
            <h2
              className={css({
                textStyle: {
                  base: "2xl",
                  lg: "3xl",
                },
                fontWeight: "bold",
                color: "zinc.800",
              })}
            >
              <span
                className={css({
                  borderBottom: "3px dotted",
                  borderColor: "zinc.300",
                })}
              >
                Links
              </span>
            </h2>
            <div
              className={grid({
                color: "zinc.500",
                fontWeight: 500,
                fontSize: "lg",
              })}
            >
              <ul
                className={css({
                  listStyle: "disc",
                  listStylePosition: "inside",
                })}
              >
                <li>
                  <a
                    href="https://twitter.com/ikumatdkr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={css({
                      _hover: {
                        color: "zinc.700",
                      },
                    })}
                  >
                    X
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/IkumaTadokoro"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={css({
                      _hover: {
                        color: "zinc.700",
                      },
                    })}
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://bento.me/ikuma"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={css({
                      _hover: {
                        color: "zinc.700",
                      },
                    })}
                  >
                    bento
                  </a>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
