# apk-host

- A simple web server for apk hosting w/ RESTful api.
- Build upon [FeathersJS](https://feathersjs.com/)

## API

### Get latest update of an app

#### Request

```bash
curl https://{your_domain}/apk/release/:applicationId
```

#### Parameters

param|description
---|---
applicationId|apk's applicationId

#### Response

```json
{
  "total": 1,
  "limit": 1,
  "skip": 0,
  "data": [
    {
      "id": 7,
      "appId": "{applicationId}",
      "versionCode": 2,
      "versionName": "1.0",
      "size": 12265067,
      "whatsNew": "message",
      "path": "/path/to/your.apk",
      "createdAt": "2019-09-06T01:43:36.000Z"
    }
  ]
}
```


### Upload

#### Request

```bash
curl -X POST \
  'https://{your_host}/upload/apk?access_secret=your_super_secret' \
  -H 'content-type: multipart/form-data' \
  -F apk=@/path/to/your.apk \
  -F 'whatsNew=whats new in this version'
```

#### Parameters

param|field|description
---|---|---
access_secret|query|Your access secret in config/config.json
content-type|header|multipart/form-data
apk|body|Your apk file
whatsNew|body|version description


