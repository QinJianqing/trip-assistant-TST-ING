import ldap from 'ldapjs';

interface User {
  cn?: string;
  givenName?: string;
  displayName?: string;
  department?: string;
  name?: string;
  uid?: string;
  mail?: string;
  mobile?: string;
  thumbnailPhoto?: string;
}

export async function v01User(uid: string): Promise<any> {
  const client = ldap.createClient({
    url: 'ldap://v01.net:389'
  });
  const user: User = {
    cn: null,
    givenName: null,
    displayName: null,
    department: null,
    name: null,
    uid: null,
    mail: null,
    mobile: null,
    thumbnailPhoto: null
  };
  // 创建 LDAP 查询选项
  // filter 的作用就是相当于 SQL 的条件
  const opts = {
    filter: '(sAMAccountName=' + uid + ')', // 查询条件过滤器，查找 uid=kxh 的用户数据
    scope: 'sub', // 查询范围
    timeLimit: 500 // 查询超时
  };

  return new Promise((resolve, reject) => {
    client.bind('uidp3819@v01.net', 'Aa123456', function () {
      client.search('OU=lda,DC=v01,DC=net', opts, function (err, res) {
        res.on('searchEntry', function (entry) {
          let base64ThumbnailPhoto;
          entry.attributes.forEach(attr => {
            if (attr.type === 'thumbnailPhoto') {
              base64ThumbnailPhoto = attr._vals[0].toString('base64');
            }
          });
          // 获取查询的对象
          const userInfo = entry.object;
          user.cn = userInfo.cn;
          user.givenName = userInfo.givenName;
          user.displayName = userInfo.displayName;
          user.department = userInfo.department;
          user.name = userInfo.name;
          user.uid = userInfo.sAMAccountName;
          user.mail = userInfo.mail;
          user.mobile = userInfo.mobile;
          user.thumbnailPhoto = base64ThumbnailPhoto;
        });
        res.on('searchReference', function () {
          // console.log('referral: ' + referral.uris.join());
        });

        // 查询错误事件
        res.on('error', function (err) {
          console.error('error: ' + err.message);
          // unbind操作，必须要做
          client.unbind();
          reject('ERROR');
        });

        //查询结束
        res.on('end', function () {
          // unbind操作，必须要做
          client.unbind();
          if (!user.uid) {
            resolve('');
          }
          resolve(user);
        });
      });
    });
  });
}
