
# Marking Guide    28/ 30


## Structural design 8/10
- use a key saying "UML 2" - in 10 years, will people still know what these lines mean?
- name your associations to make it easier to read.
- some explanation in the rationale of how the various Builders, Services, Controllers work would help
- don't put default constructors in here. Everyone knows what they look like (hence the name!)
- what classes actually handle the storage?

## Runtime design 5/5
- as above, where do services fit into this diagram?


## Allocation views 5/5


## Rationale  10/10
- I thought you had a fairly comprehensive understanding of how you think the app will work. I am a little concerned the breakdown into 'front' and 'back' is not what will happen in reality. Why not 3 layers, with a business logic layer in the middle? I would be curious if this is how you actually do it in the end.
- You don't need to overdescribe what each pattern is (that's the beauty of patterns). Just say "here we use Singleton" and then explain why.
- Singleton is probably a reasonable choice for this approach; however, ensuring consistency of the underlying data is exactly what a lot of storage mechanisms like MongoDB strive for (i.e., the CAP theorem). So we could probably offload consistency of the bookings onto a strictly consistent database backend like MySQL. Then we can avoid global state with a singleton (the global state is in the storage layer).
- Some of the same points apply to the Builder pattern. Think about what state needs to be held for a long time in the code, and what state can be dumped onto the backend. 
- Put in a glossary/UL so everyone knows what an "Ingredient" is.

