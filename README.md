# KMH_JPM_Kata

[Edit in StackBlitz next generation editor ⚡️](https://stackblitz.com/~/github.com/jeroniPM/KMH_JPM_Kata)

## COMMANDS

* START THE APP: `npm start`
* BUILD THE APP WITH NON PROD CONFIG: `npm run build`
* BUILD THE APP WITH PROD CONFIG: `npm run build:prod`
* LINT THE FILES: `npm run lint`
* TEST THE SPEC FILES: `npm run test`

Angular application built with version 18.

It represents a tree of movies where you can search titles, seasons and episodes and it is built to be extensible for additional node levels.

No extra dev library was used in this Kata to simplify the architecture.

Icons used in the application belong to Google Material Icons.

Layout system was built using Flex for simple elements and Grid for the Node Tree structure.


FEATURES:

* Search a title/season/episode and highlight the ones that result in a partial match.
* Expand/Collapse nodes to see the child ones recursively.
* See the node details with a random generated image.


FURTHER IMPROVEMENTS:

* The Node Tree layout is presented with a basic 3 column grid for root nodes and
  a 4 column grid for child nodes.
  It could be improved to set fixed height/width for elements to look more harmonic.

  Currently the whole tree is built at startups. It would be much more performant to control
  the nodes that are build on demand.
  For example, when a user expands a node the tree could get just the direct children nodes and
  drop the nodes of other root elements, collapsing the rest of root nodes, allowing only one tree hierarchy at a time.

* The search only highlights partial matches in the title, visually it does the job but is
  not the best way to highlight a node.

* The tooltips are understandable, however I could have added some logic to differentiate the node and add a more specific message.
  Also internationalization could be added.

* The number of components is small so it doesn't need much more organization, however, in the case of growing it would require a more     structured architecture; Following good practices for reusable components such as "Atomic Design".

* I have added unit testing config and a simple unit test in "movie-tree-node" as a reference of the normal structure I follow for tests.
  The coverage should be improved to cover all components, store and services if some logic were to be extracted.

* I saw a logout button, I understand this movie tree would be a private functionality and it would need authentication from the users.
  I have decided not to implement it in the assignment due to time constraints.