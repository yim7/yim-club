import json

import redis

from models.reply import Reply
from models.topic import Topic


def cache_init():
    cache = redis.StrictRedis()
    cache.flushdb()
    return cache


cache = cache_init()


def dict_to_object(form):
    t = Topic()
    for name, value in form.items():
        setattr(t, name, value)
    return t


def created_topic(user_id):
    k = 'created_topic_{}'.format(user_id)
    if cache.exists(k):
        v = cache.get(k)
        ts = json.loads(v)
        ts = [dict_to_object(t) for t in ts]
        return ts
    else:
        ts = Topic.created_topic(user_id=user_id)
        v = json.dumps([t.json() for t in ts])
        cache.set(k, v)
        return ts


def replied_topic(user_id):
    k = 'replied_topic_{}'.format(user_id)
    if cache.exists(k):
        v = cache.get(k)
        ts = json.loads(v)
        ts = [dict_to_object(t) for t in ts]
        return ts
    else:
        ts = Topic.replied_topic(user_id=user_id)
        v = json.dumps([t.json() for t in ts])
        cache.set(k, v)
        return ts


def update_created_topic_cache(user_id):
    k = 'created_topic_{}'.format(user_id)

    ts = Topic.created_topic(user_id=user_id)
    v = json.dumps([t.json() for t in ts])
    cache.set(k, v)


def update_replied_topic_cache(user_id):
    k = 'replied_topic_{}'.format(user_id)

    ts = Topic.replied_topic(user_id=user_id)
    v = json.dumps([t.json() for t in ts])
    cache.set(k, v)
