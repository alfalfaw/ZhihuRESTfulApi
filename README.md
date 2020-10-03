#### ZhihuRESTfulApi

这是一个基于 Koa2 的 Nodejs 项目，实现了知乎网站主要功能

#### 功能列表

##### 用户

- 用户列表
- 用户详情
- 创建用户
- 更新用户
- 删除用户
- 登录
- 获取已关注用户列表
- 获取用户粉丝列表
- 关注用户
- 取消关注
- 用户关注话题列表
- 用户关注话题
- 用户取消关注话题
- 用户关注问题列表
- 用户问题列表(用户-问题的一对多关系)
- 用户关注问题
- 用户取消关注问题
- 用户赞同答案列表
- 用户赞同答案
- 用户取消赞同
- 用户不赞同答案列表
- 用户不赞同答案
- 用户取消不赞同
- 用户收藏答案列表
- 用户收藏答案
- 用户取消收藏

##### 话题

- 获取话题列表
- 话题详情
- 创建话题
- 修改话题
- 删除话题
- 获取话题粉丝列表
- 获取话题的问题列表

##### 问题

- 问题列表

- 创建问题
- 修改问题
- 删除问题
- 问题详情
- 问题的话题列表(问题-话题多对多关系)
- 问题的关注列表(问题-用户多对多关系)

##### 回答

- 回答列表
- 创建回答(问题-答案/用户-答案一对多)
- 回答详情
- 修改回答
- 删除回答

##### 评论

- 获取评论列表
- 发表评论(答案-评论/问题-评论/用户-评论一对多、多级评论)
- 获取评论详情
- 修改评论
- 删除评论

#### API 文档

##### 登录

###### 接口：

```
POST /users/login
```

###### 参数：

| 参数名   | 参数类型 | 参数位置 | 描述         |
| -------- | -------- | -------- | ------------ |
| name     | string   | body     | 用户名，必填 |
| password | string   | body     | 密码，必填   |

###### 响应：

```
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjcxZDNkNDk4ZDRkYzBkZTEzMjAwZjUiLCJuYW1lIjoiYWxmYWxmYXciLCJpYXQiOjE2MDE0NjExNTMsImV4cCI6MTYwMTU0NzU1M30.HairtegFaKmtiFOyIZ7iWche11L8dlZ614bjynRhOWs"
}
```

##### 获取用户列表

###### 接口：

```
GET /users
```

###### 参数：

| 参数名   | 参数类型 | 参数位置 | 描述               |
| -------- | -------- | -------- | ------------------ |
| per_page | number   | query    | 可选，每页大小     |
| page     | number   | query    | 可选，当前所在页码 |

###### 响应：

```
[
  {
    "gender": "male",
    "_id": "5f71d3d498d4dc0de13200f5",
    "name": "alfalfaw",
    "avatar_url": "test_url",
    "__v": 3
  }
]
```

#####获取用户详情

###### 接口：

```
GET /users/:id
```

###### 参数：

| 参数名 | 参数类型 | 参数位置 | 描述                                                                                                                                                           |
| ------ | -------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id     | string   | path     | 必选，用户 id                                                                                                                                                  |
| fields | string   | query    | 可选，需要增加到返回结果中的字段。可选项`locations business employments educations following followingTopics likingAnswers dislikingAnswers collectingAnswers` |

###### 响应：

```
{
  "gender": "male",
  "locations": [],
  "following": [],
  "followingTopics": [
    {
      "_id": "5f71ddf84557410e40278a2e",
      "name": "水木年华",
      "avatar_url": "test_url",
      "__v": 0
    }
  ],
  "likingAnswers": [
    {
      "voteCount": 0,
      "_id": "5f771b1b1755574dbb6f5b0b",
      "content": "这是答案",
      "answerer": "5f71d3d498d4dc0de13200f5",
      "questionId": "5f734af88519d353e0dcea03",
      "createdAt": "2020-10-02T12:20:43.530Z",
      "updatedAt": "2020-10-02T12:30:28.505Z",
      "__v": 0
    }
  ],
  "dislikingAnswers": [],
  "collectingAnswers": [],
  "_id": "5f71d3d498d4dc0de13200f5",
  "name": "alfalfaw",
  "avatar_url": "test_url",
  "__v": 10,
  "updatedAt": "2020-10-02T13:00:53.472Z",
  "createdAt": "2020-10-02T10:52:46.202Z"
}
```

#####创建用户

###### 接口：

```
POST /users
```

###### 参数：

| 参数名   | 参数类型 | 参数位置 | 描述               |
| -------- | -------- | -------- | ------------------ |
| name     | string   | body     | 必须且唯一，用户名 |
| password | string   | body     | 必须，用户密码     |

###### 响应：

```
{
  "gender": "male",
  "locations": [],
  "following": [],
  "followingTopics": [],
  "likingAnswers": [],
  "dislikingAnswers": [],
  "collectingAnswers": [],
  "_id": "5f76d22e58edc146378be327",
  "name": "alfalfaw2",
  "password": "$2b$10$jNfWo9MYKKJs9N4xUzv9WeumlSProJxQ7L5TBMDPBrQ9VjJXm1ZD.",
  "employments": [],
  "educations": [],
  "createdAt": "2020-10-02T07:09:35.017Z",
  "updatedAt": "2020-10-02T07:09:35.017Z",
  "__v": 0
}
```

#####修改用户资料

###### 接口：

```
PATCH /users
```

###### 参数：

| 参数名            | 参数类型 | 参数位置 | 描述                           |
| ----------------- | -------- | -------- | ------------------------------ |
| Authorization     | string   | header   | 必须，token 参数               |
| name              | string   | body     | 可选，用户名                   |
| password          | string   | body     | 可选，密码                     |
| avatar_url        | string   | body     | 可选，头像                     |
| gender            | enum     | body     | 可选，性别。'male'或者'female' |
| headline          | string   | body     | 可选，简介                     |
| locations         | array    | body     | 可选，地点                     |
| business          | object   | body     | 可选，行业                     |
| employments       | array    | body     | 可选，职业经历                 |
| educations        | array    | body     | 可选，教育经历                 |
| following         | array    | body     | 可选，关注的人                 |
| followingTopics   | array    | body     | 可选，关注的话题               |
| likingAnswers     | array    | body     | 可选，喜欢的答案               |
| dislikingAnswers  | array    | body     | 可选，不喜欢的答案             |
| collectingAnswers | array    | body     | 可选，收藏的答案               |

###### 响应：

```
{
  "gender": "male",
  "_id": "5f71d3d498d4dc0de13200f5",
  "name": "alfalfaw",
  "avatar_url": "test_url",
  "__v": 10,
  "updatedAt": "2020-10-02T13:05:26.961Z",
  "createdAt": "2020-10-02T10:52:46.202Z"
}
```

#####删除用户

###### 接口：

```
DELETE /users
```

###### 参数：

| 参数名        | 参数类型 | 参数位置 | 描述             |
| ------------- | -------- | -------- | ---------------- |
| Authorization | string   | header   | 必须，token 参数 |

###### 响应：

```
status 204
```

#####获取已关注用户列表

###### 接口：

```
GET /users/:id/following
```

###### 参数：

| 参数名 | 参数类型 | 参数位置 | 描述          |
| ------ | -------- | -------- | ------------- |
| id     | string   | path     | 必选，用户 id |

###### 响应：

```
[
  {
    "gender": "male",
    "_id": "5f7705281d073d487d312571",
    "name": "tom",
    "createdAt": "2020-10-02T10:47:04.147Z",
    "updatedAt": "2020-10-02T10:47:04.147Z",
    "__v": 0
  }
]
```

#####关注用户

###### 接口：

```
PUT /users/following/:id
```

###### 参数：

| 参数名        | 参数类型 | 参数位置 | 描述                |
| ------------- | -------- | -------- | ------------------- |
| Authorization | string   | header   | 必须，token 参数    |
| id            | string   | path     | 必须，被关注人的 id |

###### 响应：

```
status 204
```

#####获取用户粉丝列表

###### 接口：

```
GET /users/:id/followers
```

###### 参数：

| 参数名 | 参数类型 | 参数位置 | 描述          |
| ------ | -------- | -------- | ------------- |
| id     | string   | path     | 必选，用户 id |

###### 响应：

```
[
  {
    "gender": "male",
    "_id": "5f71d3d498d4dc0de13200f5",
    "name": "alfalfaw",
    "avatar_url": "test_url",
    "__v": 4,
    "updatedAt": "2020-10-02T10:52:46.202Z",
    "createdAt": "2020-10-02T10:52:46.202Z"
  }
]
```

#####取消关注用户

###### 接口：

```
DELETE /users/following/:id
```

###### 参数：

| 参数名        | 参数类型 | 参数位置 | 描述                    |
| ------------- | -------- | -------- | ----------------------- |
| Authorization | string   | header   | 必选，token 参数        |
| id            | string   | path     | 必选，取消关注的用户 id |

###### 响应：

```
status 204
```

#####获取用户关注话题列表

###### 接口：

```
GET /users/:id/followingTopics
```

###### 参数：

| 参数名 | 参数类型 | 参数位置 | 描述          |
| ------ | -------- | -------- | ------------- |
| id     | string   | path     | 必选，用户 id |

###### 响应：

```
[
  {
    "_id": "5f71ddf84557410e40278a2e",
    "name": "水木年华",
    "avatar_url": "test_url",
    "__v": 0
  }
]
```

#####用户关注话题

###### 接口：

```
PUT /users/followingTopic/:id
```

###### 参数：

| 参数名        | 参数类型 | 参数位置 | 描述             |
| ------------- | -------- | -------- | ---------------- |
| Authorization | string   | header   | 必选，token 参数 |
| id            | string   | path     | 必选，话题 id    |

###### 响应：

```
status 204
```

#####用户取消关注话题

###### 接口：

```
DELETE /users/followingTopic/:id
```

###### 参数：

| 参数名        | 参数类型 | 参数位置 | 描述             |
| ------------- | -------- | -------- | ---------------- |
| Authorization | string   | header   | 必选，token 参数 |
| id            | string   | path     | 必选，话题 id    |

###### 响应：

```
status 204
```

#####获取用户问题列表

###### 接口：

```
GET /users/:id/questions
```

###### 参数：

| 参数名 | 参数类型 | 参数位置 | 描述          |
| ------ | -------- | -------- | ------------- |
| id     | string   | path     | 必选，用户 id |

###### 响应：

```
[
  {
    "_id": "5f734af88519d353e0dcea03",
    "title": "如何看待鸿蒙应用开发框架采用JavaScript作为开发语言？",
    "description": "",
    "questioner": "5f71d3d498d4dc0de13200f5",
    "__v": 0
  }
]
```

#####用户喜欢的答案列表

###### 接口：

```
GET /users/:id/likingAnswers
```

###### 参数：

| 参数名 | 参数类型 | 参数位置 | 描述          |
| ------ | -------- | -------- | ------------- |
| id     | string   | path     | 必选，答案 id |

###### 响应：

```
[
  {
    "voteCount": 1,
    "_id": "5f771b1b1755574dbb6f5b0b",
    "content": "这是回答",
    "answerer": "5f71d3d498d4dc0de13200f5",
    "questionId": "5f734af88519d353e0dcea03",
    "createdAt": "2020-10-02T12:20:43.530Z",
    "updatedAt": "2020-10-02T12:21:19.528Z",
    "__v": 0
  }
]
```

#####用户喜欢答案

###### 接口：

```
PUT /users/likingAnswers/:id
```

###### 参数：

| 参数名        | 参数类型 | 参数位置 | 描述             |
| ------------- | -------- | -------- | ---------------- |
| Authorization | string   | header   | 必选，token 参数 |
| id            | string   | path     | 必选，答案 id    |

###### 响应：

```
status 204
```

#####用户取消喜欢答案

###### 接口：

```
DELETE /users/likingAnswers/:id
```

###### 参数：

| 参数名        | 参数类型 | 参数位置 | 描述             |
| ------------- | -------- | -------- | ---------------- |
| Authorization | string   | header   | 必选，token 参数 |
| id            | string   | path     | 必选，答案 id    |

###### 响应：

```
status 204
```

#####用户不喜欢的答案列表

###### 接口：

```
GET /users/:id/dislikingAnswers
```

###### 参数：

| 参数名 | 参数类型 | 参数位置 | 描述          |
| ------ | -------- | -------- | ------------- |
| id     | string   | path     | 必选，用户 id |

###### 响应：

```
[
  {
    "voteCount": 0,
    "_id": "5f771b1b1755574dbb6f5b0b",
    "content": "这是回答",
    "answerer": "5f71d3d498d4dc0de13200f5",
    "questionId": "5f734af88519d353e0dcea03",
    "createdAt": "2020-10-02T12:20:43.530Z",
    "updatedAt": "2020-10-02T12:30:28.505Z",
    "__v": 0
  }
]
```

#####用户不喜欢答案

###### 接口：

```
PUT /users/dislikingAnswers/:id
```

###### 参数：

| 参数名        | 参数类型 | 参数位置 | 描述             |
| ------------- | -------- | -------- | ---------------- |
| Authorization | string   | header   | 必选，token 参数 |
| id            | string   | path     | 必选，答案 id    |

###### 响应：

```
status 204
```

#####用户取消不喜欢回答

###### 接口：

```
DELETE /users/dislikingAnswers/:id
```

###### 参数：

| 参数名        | 参数类型 | 参数位置 | 描述             |
| ------------- | -------- | -------- | ---------------- |
| Authorization | string   | header   | 必选，token 参数 |
| id            | string   | path     | 必选，回答 id    |

###### 响应：

```
status 204
```

#####用户收藏答案列表

###### 接口：

```
GET /users/:id/collectingAnswers
```

###### 参数：

| 参数名 | 参数类型 | 参数位置 | 描述          |
| ------ | -------- | -------- | ------------- |
| id     | string   | path     | 必选，用户 id |

###### 响应：

```
[
  {
    "voteCount": 0,
    "_id": "5f771b1b1755574dbb6f5b0b",
    "content": "这是回答",
    "answerer": "5f71d3d498d4dc0de13200f5",
    "questionId": "5f734af88519d353e0dcea03",
    "createdAt": "2020-10-02T12:20:43.530Z",
    "updatedAt": "2020-10-02T12:30:28.505Z",
    "__v": 0
  }
]
```

#####用户收藏答案

###### 接口：

```
PUT /users/collectingAnswers/:id
```

###### 参数：

| 参数名        | 参数类型 | 参数位置 | 描述             |
| ------------- | -------- | -------- | ---------------- |
| Authorization | string   | header   | 必选，token 参数 |
| id            | string   | path     | 必选，答案 id    |

###### 响应：

```
status 204
```

#####用户取消收藏答案

###### 接口：

```
DELETE /users/collectingAnswers/:id
```

###### 参数：

| 参数名        | 参数类型 | 参数位置 | 描述             |
| ------------- | -------- | -------- | ---------------- |
| Authorization | string   | header   | 必选，token 参数 |
| id            | string   | path     | 必选，答案 id    |

###### 响应：

```
status 204
```

#####创建回答

###### 接口：

```
POST /questions/:questionId/answers
```

###### 参数：

| 参数名        | 参数类型 | 参数位置 | 描述             |
| ------------- | -------- | -------- | ---------------- |
| Authorization | string   | header   | 必选，token 参数 |
| questionId    | string   | path     | 必选，问题 id    |

###### 响应：

```
{
  "topics": [],
  "voteCount": 0,
  "_id": "5f77177b90d3df4c46def772",
  "content": "这是回答",
  "answerer": "5f71d3d498d4dc0de13200f5",
  "questionId": "5f734af88519d353e0dcea03",
  "createdAt": "2020-10-02T12:05:15.146Z",
  "updatedAt": "2020-10-02T12:05:15.146Z",
  "__v": 0
}
```

#####获取回答列表

###### 接口：

```
GET /questions/:questionId/answers
```

###### 参数：

| 参数名     | 参数类型 | 参数位置 | 描述          |
| ---------- | -------- | -------- | ------------- |
| questionId | string   | path     | 必选，问题 id |

###### 响应：

```
[
  {
    "voteCount": 0,
    "_id": "5f77177b90d3df4c46def772",
    "content": "这是回答",
    "answerer": "5f71d3d498d4dc0de13200f5",
    "questionId": "5f734af88519d353e0dcea03",
    "createdAt": "2020-10-02T12:05:15.146Z",
    "updatedAt": "2020-10-02T12:05:15.146Z",
    "__v": 0
  }
]
```

#####获取回答详情

###### 接口：

```
GET /questions/:questionId/answers/:id
```

###### 参数：

| 参数名     | 参数类型 | 参数位置 | 描述          |
| ---------- | -------- | -------- | ------------- |
| questionId | string   | path     | 必选，问题 id |
| id         | string   | path     | 必选，答案 id |

###### 响应：

```
{
  "voteCount": 0,
  "_id": "5f77177b90d3df4c46def772",
  "content": "这是答案",
  "answerer": {
    "gender": "male",
    "_id": "5f71d3d498d4dc0de13200f5",
    "name": "alfalfaw",
    "avatar_url": "test_url",
    "__v": 10,
    "updatedAt": "2020-10-02T13:05:26.961Z",
    "createdAt": "2020-10-02T10:52:46.202Z"
  },
  "questionId": "5f734af88519d353e0dcea03",
  "createdAt": "2020-10-02T12:05:15.146Z",
  "updatedAt": "2020-10-02T12:05:15.146Z",
  "__v": 0
}
```

#####修改回答

###### 接口：

```
PATCH /questions/:questionId/answers/:id
```

###### 参数：

| 参数名        | 参数类型 | 参数位置 | 描述             |
| ------------- | -------- | -------- | ---------------- |
| Authorization | string   | header   | 必选，token 参数 |
| questionId    | string   | path     | 必选，问题 id    |
| id            | string   | path     | 必选，答案 id    |

###### 响应：

```
{
  "n": 1,
  "nModified": 1,
  "ok": 1
}
```

#####删除回答

###### 接口：

```
DELETE /questions/:questionId/answers/:id
```

###### 参数：

| 参数名        | 参数类型 | 参数位置 | 描述             |
| ------------- | -------- | -------- | ---------------- |
| Authorization | string   | header   | 必选，token 参数 |
| questionId    | string   | path     | 必选，问题 id    |
| id            | string   | path     | 必选，答案 id    |

###### 响应：

```
status 204
```

#####获取问题列表

###### 接口：

```
GET /questions
```

###### 参数：

| 参数名   | 参数类型 | 参数位置 | 描述               |
| -------- | -------- | -------- | ------------------ |
| per_page | number   | query    | 可选，每页大小     |
| page     | number   | query    | 可选，当前所在页码 |

###### 响应：

```
[
  {
    "_id": "5f734af88519d353e0dcea03",
    "title": "这是一个问题",
    "description": "这是问题的描述",
    "questioner": "5f71d3d498d4dc0de13200f5",
    "__v": 0
  }
]
```

#####获取问题详情

###### 接口：

```
GET /questions/:id
```

###### 参数：

| 参数名 | 参数类型 | 参数位置 | 描述          |
| ------ | -------- | -------- | ------------- |
| id     | string   | path     | 必选，问题 id |

###### 响应：

```
{
  "topics": [],
  "_id": "5f734af88519d353e0dcea03",
  "title": "这是一个问题",
  "description": "这是问题的描述",
  "questioner": {
    "gender": "male",
    "_id": "5f71d3d498d4dc0de13200f5",
    "name": "alfalfaw",
    "avatar_url": "test_url",
    "__v": 10,
    "updatedAt": "2020-10-02T13:05:26.961Z",
    "createdAt": "2020-10-02T10:52:46.202Z"
  },
  "__v": 0
}
```

#####创建问题

###### 接口：

```
POST /questions
```

###### 参数：

| 参数名        | 参数类型 | 参数位置 | 描述             |
| ------------- | -------- | -------- | ---------------- |
| Authorization | string   | header   | 必选，token 参数 |
| title         | string   | body     | 必选，标题       |
| description   | string   | body     | 可选，问题描述   |

###### 响应：

```
{
  "topics": [],
  "_id": "5f7730043312fc52b064db4c",
  "title": "问题1",
  "description": "描述1",
  "questioner": "5f71d3d498d4dc0de13200f5",
  "createdAt": "2020-10-02T13:49:56.776Z",
  "updatedAt": "2020-10-02T13:49:56.776Z",
  "__v": 0
}
```

#####修改问题

###### 接口：

```
PATCH /questions/:id
```

###### 参数：

| 参数名        | 参数类型 | 参数位置 | 描述             |
| ------------- | -------- | -------- | ---------------- |
| Authorization | string   | header   | 必选，token 参数 |
| id            | string   | path     | 必选，问题 id    |

###### 响应：

```
{ "n": 1, "nModified": 1, "ok": 1 }
```

#####删除问题

###### 接口：

```
DELETE /questions/:id
```

###### 参数：

| 参数名        | 参数类型 | 参数位置 | 描述             |
| ------------- | -------- | -------- | ---------------- |
| Authorization | string   | header   | 必选，token 参数 |
| id            | string   | path     | 必选，问题 id    |

###### 响应：

```
status 204
```

#####获取问题的关注列表

###### 接口：

```
GET /questions/:id/followers
```

###### 参数：

| 参数名 | 参数类型 | 参数位置 | 描述    |
| ------ | -------- | -------- | ------- |
| id     | string   | path     | 问题 id |

###### 响应：

```
[
  {
    "gender": "male",
    "_id": "5f71d3d498d4dc0de13200f5",
    "name": "alfalfaw",
    "avatar_url": "test_url",
    "__v": 11,
    "updatedAt": "2020-10-02T14:33:05.207Z",
    "createdAt": "2020-10-02T10:52:46.202Z"
  }
]
```

#####获取用户问题列表

###### 接口：

```
GET /users/:id/questions
```

###### 参数：

| 参数名 | 参数类型 | 参数位置 | 描述    |
| ------ | -------- | -------- | ------- |
| id     | string   | path     | 用户 id |

###### 响应：

```
[
  {
    "_id": "5f734af88519d353e0dcea03",
    "title": "问题122s",
    "description": "描述1",
    "questioner": "5f71d3d498d4dc0de13200f5",
    "__v": 0,
    "updatedAt": "2020-10-02T14:06:18.276Z"
  },
  {
    "_id": "5f7730043312fc52b064db4c",
    "title": "问题1",
    "description": "描述1",
    "questioner": "5f71d3d498d4dc0de13200f5",
    "createdAt": "2020-10-02T13:49:56.776Z",
    "updatedAt": "2020-10-02T13:49:56.776Z",
    "__v": 0
  }
]
```

##### 获取用户关注问题列表

###### 接口：

```
GET /users/:id/followingQuestions
```

###### 参数：

| 参数名 | 参数类型 | 参数位置 | 描述          |
| ------ | -------- | -------- | ------------- |
| id     | string   | path     | 必选，用户 id |

###### 响应：

```
[
  {
    "_id": "5f734af88519d353e0dcea03",
    "title": "问题122s",
    "description": "描述1",
    "questioner": "5f71d3d498d4dc0de13200f5",
    "__v": 0,
    "updatedAt": "2020-10-02T14:06:18.276Z"
  }
]
```

#####用户关注问题

###### 接口：

```
PUT /users/followingQuestion/:id
```

###### 参数：

| 参数名        | 参数类型 | 参数位置 | 描述             |
| ------------- | -------- | -------- | ---------------- |
| Authorization | string   | header   | 必选，token 参数 |
| id            | string   | path     | 必选，问题 id    |

###### 响应：

```
status 204
```

#####用户取消关注问题

###### 接口：

```
DELETE /users/followingQuestion/:id
```

###### 参数：

| 参数名        | 参数类型 | 参数位置 | 描述             |
| ------------- | -------- | -------- | ---------------- |
| Authorization | string   | header   | 必选，token 参数 |
| id            | string   | path     | 必选，问题 id    |

###### 响应：

```
status 204
```

##### 获取问题的话题列表

###### 接口：

```
GET /questions/:id/topics
```

###### 参数：

| 参数名 | 参数类型 | 参数位置 | 描述          |
| ------ | -------- | -------- | ------------- |
| id     | string   | path     | 必选，问题 id |

###### 响应：

```
[
  {
    "_id": "5f71ddf84557410e40278a2e",
    "name": "水木年华",
    "avatar_url": "test_url",
    "__v": 0
  }
]
```

##### 获取话题列表

###### 接口：

```
GET /topics
```

###### 参数：

| 参数名   | 参数类型 | 参数位置 | 描述               |
| -------- | -------- | -------- | ------------------ |
| per_page | number   | query    | 可选，每页大小     |
| page     | number   | query    | 可选，当前所在页码 |

###### 响应：

```
[
  {
    "_id": "5f71ddf84557410e40278a2e",
    "name": "水木年华",
    "avatar_url": "test_url",
    "__v": 0
  }
]
```

#####获取话题详情

###### 接口：

```
GET /topics/:id
```

###### 参数：

| 参数名 | 参数类型 | 参数位置 | 描述          |
| ------ | -------- | -------- | ------------- |
| id     | string   | path     | 必选，话题 id |

###### 响应：

```
{
  "_id": "5f71ddf84557410e40278a2e",
  "name": "水木年华",
  "avatar_url": "test_url",
  "__v": 0
}
```

#####创建话题

###### 接口：

```
POST /topics
```

###### 参数：

| 参数名        | 参数类型 | 参数位置 | 描述             |
| ------------- | -------- | -------- | ---------------- |
| Authorization | string   | header   | 必选，token 参数 |
| name          | string   | body     | 必选，标题       |
| avatar_url    | string   | body     | 可选，话题封面   |
| introduction  | string   | body     | 可选，话题描述   |

###### 响应：

```
{
  "_id": "5f77402928281f57f19bb665",
  "name": "水木年华11",
  "avatar_url": "test_url",
  "introduction": "测试话题",
  "createdAt": "2020-10-02T14:58:49.727Z",
  "updatedAt": "2020-10-02T14:58:49.727Z",
  "__v": 0
}
```

#####删除话题

###### 接口：

```
DELETE /topics/:id
```

###### 参数：

| 参数名        | 参数类型 | 参数位置 | 描述             |
| ------------- | -------- | -------- | ---------------- |
| Authorization | string   | header   | 必选，token 参数 |
| id            | string   | path     | 话题 id          |

###### 响应：

```
status 204
```

##### 获取话题粉丝列表

###### 接口：

```
GET /topics/:id/followers
```

###### 参数：

| 参数名 | 参数类型 | 参数位置 | 描述    |
| ------ | -------- | -------- | ------- |
| id     | string   | path     | 话题 id |

###### 响应：

```
[
  {
    "gender": "male",
    "_id": "5f71d3d498d4dc0de13200f5",
    "name": "alfalfaw",
    "avatar_url": "test_url",
    "__v": 11,
    "updatedAt": "2020-10-02T14:33:05.207Z",
    "createdAt": "2020-10-02T10:52:46.202Z"
  }
]
```

##### 获取话题的问题列表

###### 接口：

```
GET /topics/:id/questions
```

###### 参数：

| 参数名 | 参数类型 | 参数位置 | 描述    |
| ------ | -------- | -------- | ------- |
| id     | string   | path     | 话题 id |

###### 响应：

```
[
  {
    "_id": "5f734af88519d353e0dcea03",
    "title": "问题122s",
    "description": "描述1",
    "questioner": "5f71d3d498d4dc0de13200f5",
    "__v": 0,
    "updatedAt": "2020-10-02T15:13:42.624Z"
  }
]
```

#####获取评论列表

###### 接口：

```
GET /questions/:questionId/answers/:answerId/comments
```

###### 参数：

| 参数名     | 参数类型 | 参数位置 | 描述          |
| ---------- | -------- | -------- | ------------- |
| questionId | string   | path     | 必选，问题 id |
| answerId   | string   | path     | 必选，回答 id |

###### 响应：

```
[
  {
    "_id": "5f7749065aabfe5ac4d5c4d0",
    "content": "评论1",
    "commentator": {
      "gender": "male",
      "_id": "5f71d3d498d4dc0de13200f5",
      "name": "alfalfaw",
      "avatar_url": "test_url",
      "__v": 11,
      "updatedAt": "2020-10-02T14:33:05.207Z",
      "createdAt": "2020-10-02T10:52:46.202Z"
    },
    "answerId": "5f771b1b1755574dbb6f5b0b",
    "questionId": "5f734af88519d353e0dcea03",
    "createdAt": "2020-10-02T15:36:38.362Z",
    "updatedAt": "2020-10-02T15:36:38.362Z",
    "__v": 0
  }
]
```

#####发表评论

###### 接口：

5f734af88519d353e0dcea03

5f771b1b1755574dbb6f5b0b

5f7749065aabfe5ac4d5c4d0

```
POST /questions/:questionId/answers/:answerId/comments
```

###### 参数：

| 参数名        | 参数类型 | 参数位置 | 描述             |
| ------------- | -------- | -------- | ---------------- |
| Authorization | string   | header   | 必选，token 参数 |
| questionId    | string   | path     | 必选，问题 id    |
| answerId      | string   | path     | 必选，回答 id    |
| content       | string   | body     | 必选，评论内容   |
| rootCommentId | string   | body     | 可选，根评论 id  |
| replyTo       | string   | body     | 可选，被评论的人 |

###### 响应：

```
{
  "_id": "5f7749065aabfe5ac4d5c4d0",
  "content": "评论1",
  "commentator": "5f71d3d498d4dc0de13200f5",
  "answerId": "5f771b1b1755574dbb6f5b0b",
  "questionId": "5f734af88519d353e0dcea03",
  "createdAt": "2020-10-02T15:36:38.362Z",
  "updatedAt": "2020-10-02T15:36:38.362Z",
  "__v": 0
}
```

#####获取评论详情

###### 接口：

```
GET /questions/:questionId/answers/:answerId/comments/:id
```

###### 参数：

| 参数名     | 参数类型 | 参数位置 | 描述          |
| ---------- | -------- | -------- | ------------- |
| questionId | string   | path     | 必选，问题 id |
| answerId   | string   | path     | 必选，回答 id |
| id         | string   | path     | 必选，评论 id |

###### 响应：

```
{
  "_id": "5f7749065aabfe5ac4d5c4d0",
  "content": "评论1",
  "commentator": {
    "gender": "male",
    "_id": "5f71d3d498d4dc0de13200f5",
    "name": "alfalfaw",
    "avatar_url": "test_url",
    "__v": 11,
    "updatedAt": "2020-10-02T14:33:05.207Z",
    "createdAt": "2020-10-02T10:52:46.202Z"
  },
  "answerId": "5f771b1b1755574dbb6f5b0b",
  "questionId": "5f734af88519d353e0dcea03",
  "createdAt": "2020-10-02T15:36:38.362Z",
  "updatedAt": "2020-10-02T15:36:38.362Z",
  "__v": 0
}
```

#####修改评论

###### 接口：

```
PATCH /questions/:questionId/answers/:answerId/comments/:id
```

###### 参数：

| 参数名        | 参数类型 | 参数位置 | 描述             |
| ------------- | -------- | -------- | ---------------- |
| Authorization | string   | header   | 必选，token 参数 |
| questionId    | string   | path     | 必选，问题 id    |
| answerId      | string   | path     | 必选，回答 id    |
| id            | string   | path     | 必选，评论 id    |
| content       | string   | body     | 必选，评论内容   |

###### 响应：

```
status 204
```

#####删除评论

###### 接口：

```
DELETE /questions/:questionId/answers/:answerId/comments/:id
```

###### 参数：

| 参数名        | 参数类型 | 参数位置 | 描述             |
| ------------- | -------- | -------- | ---------------- |
| Authorization | string   | header   | 必选，token 参数 |
| questionId    | string   | path     | 必选，问题 id    |
| answerId      | string   | path     | 必选，回答 id    |
| id            | string   | path     | 必选，评论 id    |

###### 响应：

```
status 204
```
