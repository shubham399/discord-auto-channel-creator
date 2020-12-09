# discord-auto-channel-creator
A repo to automatically create a channel using github workflow.


This Repo is used to create Channels automatically using github actions.


Fork the repo.


Modify `.github/workflow/create-channels.yml` with timestamp when the channel has to be created.


If we want to create a channel in a specific Category.


You can call 

```js
const createChannels = async (category, name) => {
  let channel = await discord.createChannel(`${name}`, category.id)
  console.log("Channel Created:", channel.name);
}
```


where you pass the `category` object and `name` of the channel.

You can get the category using

```js
    let category = await discord.getCategory(cateogry)
```

Modify these values. and you should be done.

In the Repo Setting,

Set an Secret as `BOT_TOKEN` which is the Discord Bot token.
