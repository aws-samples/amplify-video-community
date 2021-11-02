import React from "react";
import clsx from "clsx";
import styles from "./HomepageFeatures.module.css";

const FeatureList = [
  {
    title: "Keep focus on the outcomes that matter",
    Svg: require("../../static/img/focus.svg").default,
    description: (
      <>
        It’s never been easier to produce and distribute video. Armed with a
        smartphone equivalent of a studio in our pockets, anyone can be a
        journalist, e-sports broadcaster, or home cooking star!
      </>
    ),
  },
  {
    title: "Easy to use",
    Svg: require("../../static/img/easy_to_use.svg").default,
    description: (
      <>
        By answering a few prompts in the command line, Amplify Video spins up
        infrastructure that adheres to best practices codified by the AWS
        community.
      </>
    ),
  },
  {
    title: "Infinite possibilities, create your own solution",
    Svg: require("../../static/img/build.svg").default,
    description: (
      <>
        If you want to see examples of how to build and host applications
        integrated with this plugin, check out the <a href="https://github.com/awslabs/aws-amplify-unicorntrivia-workshoeasy
        " target="_blank">UnicornTrivia workshop</a> and <a href="https://github.com/awslabs/unicornflix" target="_blank">UnicornFlix workshop!</a> 
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
