import React from "react";
import { ArticleData } from "./Articles";

import "./article.css"

function Text() {
  return <React.Fragment>
    <p>
      If you are wondering whether you can fit your e590 with a 32GB SO-DIMM
      DDR4 module, the answer is probably yes.
    </p>
    <p>
      The supporting evidence is my i5 e590, which is currently running a 16GB
      2400MHz module (CT16G4SFD824A.M16FE) side by side with a 32GB 3200MHz
      module (CT32G4SFD832A.C16FB), totalling roughly 48GB.
    </p>
    <p>
      The dmidecode Linux tool reports that both are configured to run at
      2400MT/s. Apparently the newer 3200MHz modules, which happen to be cheaper
      and more available than their slower predecessors, run just fine at lower
      frequencies.
    </p>
    <p>
      A note on installation: When I first inserted the two modules, the laptop
      wouldn't boot. After waiting about 30 minutes and a couple of restarts, I
      removed the 16GB module and placed the 32GB module in its slot. This
      configuration booted in under a minute. Finally I added the 16GB module,
      effectively swapping the first configuration, and the computer booted
      successfully with 48GB of RAM.
    </p>
  </React.Fragment>
}

export const _2021_06_16_e590_48gb_upgrade: ArticleData = {
  published: 1623800030,
  slug: 'e590-48gb-ram-upgrade',
  title: 'ThinkPad e590 48GB RAM upgrade',
  text: Text()
}
