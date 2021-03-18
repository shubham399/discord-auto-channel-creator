# discord-auto-channel-creator
A repo to automatically create a channel using github workflow.


This Repo is used to create Channels automatically using github actions.

![build pass](https://github.com/shubham399/discord-auto-channel-creator/workflows/Create%20New%20Box%20Channels/badge.svg)


Open in

[![Open in Cloud Shell](https://user-images.githubusercontent.com/27065646/92304704-8d146d80-ef80-11ea-8c29-0deaabb1c702.png)](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/shubham399/discord-auto-channel-creator&tutorial=README.md)


Fork the repo.


Modify `.github/workflow/create-channels.yml` with timestamp when the channel has to be created.

Set and `BOT_TOKEN` env

### Available Function

#### Get Category
```js
let category = await getCategory(categoryName)
```

This function will get Category from the name

Note: This will use `include` instead of equal comparison


#### Create Channel

```js
let newChannel = await createChannel(name, parentId=null)
```

This function will create a discord channel

#### Update Channel

```js
let channel = await updateChannel(channelId, parentId=null,permission=null)
```

#### Get Channels in a Category

```js
let channels = await getChannelsInCategory(categoryId)
```
