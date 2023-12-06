I'm using mikro-orm and I'm having a difficult time finding a way to accomplish something... I have a Users model and a Cards model with a n:n relationship between them (so I also have a UsersCards model). The UsersCards model also has a field called `isDismissed` which defaults to false and then we set to true after a user dismisses a card.

I want to have a field on Users that is `activeCards` which gets all the Cards where `isDismissed` is false on UsersCards. I'm not sure how to do this with mikro-orm. I can't find any way to do this natively with mikro-orm such that when I initially load the model while using { populate: ['*'] } it will only load the active cards.

If there's truly no way to do this natively with mikro-orm, then create a custom decorator that will do this for me. I'm not sure how to do this either. In case it's not already obvious, this is all in TypeScript and your solution should be written in TypeScript.

**IMPORTANT**: DO NOT INCLUDE **ANY** PLACEHOLDERS OR INCOMPLETE CODE. YOUR CODE MUST BE COMPLETE AND WORKING AS IT WILL BE AUTO-RUN BY A TEST SUITE AS SOON AS YOU SUBMIT YOUR RESPONSE. DO NOT INCLUDE **ANY** COMMENTS IN THE CODE OR YOUR RESPONSE WILL BE REJECTED AND A KITTEN WILL BE DECAPITATED.

Here's my existing migration code: