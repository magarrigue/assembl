# -*- coding: utf-8 -*-
import json
import pytest
import mock
from graphql_relay.node.node import to_global_id
from graphql_relay.connection.arrayconnection import offset_to_cursor

from assembl import models
from assembl.graphql.schema import Schema as schema
from assembl.graphql.utils import create_root_thematic


def test_get_locales(graphql_request):
    res = schema.execute(
        u'query { locales(lang: "fr") { localeCode, label } }', context_value=graphql_request)
    assert len(res.data['locales']) == 104
    assert res.data['locales'][-1]['localeCode'] == u'zu'
    assert res.data['locales'][-1]['label'] == u'zoulou'


def test_get_thematics_noresult(graphql_request):
    res = schema.execute(
        u'query { thematics: ideas(identifier: "survey") { ... on Thematic { id, title, description, numPosts, numContributors, questions { title }, video {title, descriptionTop, descriptionBottom, htmlCode} } } }', context_value=graphql_request)
    assert json.loads(json.dumps(res.data)) == {u'thematics': []}


def test_get_thematics_no_video(discussion, graphql_request, test_session):
    title = u"Comprendre les dynamiques et les enjeux"
    title = models.LangString.create(title, locale_code="fr")
    root_thematic = create_root_thematic(discussion, "survey")
    thematic = models.Thematic(
        discussion_id=discussion.id,
        title=title,
        identifier="survey")
    test_session.add(
        models.IdeaLink(source=root_thematic, target=thematic, order=1.0))
    test_session.commit()
    thematic_gid = to_global_id('Thematic', thematic.id)

    res = schema.execute(
        u'query { thematics: ideas(identifier: "survey") { ... on Thematic { id, title, description, numPosts, numContributors, totalSentiments, questions { title }, video {title, descriptionTop, descriptionBottom, descriptionSide, htmlCode} } } }', context_value=graphql_request)
    assert json.loads(json.dumps(res.data)) == {
        u'thematics': [{u'description': u'',
                        u'id': thematic_gid,
                        u'numContributors': 0,
                        u'numPosts': 0,
                        u'totalSentiments': 0,
                        u'questions': [],
                        u'title': u'Comprendre les dynamiques et les enjeux',
                        u'video': None}]}


def test_get_thematics_with_video(discussion, graphql_request, test_session):
    title = u"Comprendre les dynamiques et les enjeux"
    title = models.LangString.create(title, locale_code="fr")
    video_title = models.LangString.create(
        u"Laurent Alexandre, chirurgien et expert en intelligence artificielle nous livre ses prédictions pour le 21e siècle.",
        locale_code="fr")
    video_desc_top = models.LangString.create(
        u"Personne ne veut d'un monde où on pourrait manipuler nos cerveaux et où les états pourraient les bidouiller",
        locale_code="fr")
    video_desc_bottom = models.LangString.create(
        u"Calise de tabarnak",
        locale_code="fr")
    video_desc_side = models.LangString.create(
        u"Putain",
        locale_code="fr")
    root_thematic = create_root_thematic(discussion, "survey")
    thematic = models.Thematic(
        discussion_id=discussion.id,
        title=title,
        identifier="survey",
        video_title=video_title,
        video_description_top=video_desc_top,
        video_description_bottom=video_desc_bottom,
        video_description_side=video_desc_side,
        video_html_code=u"https://something.com",
    )
    test_session.add(
        models.IdeaLink(source=root_thematic, target=thematic, order=1.0))
    test_session.commit()
    thematic_gid = to_global_id('Thematic', thematic.id)

    res = schema.execute(
        u'query { thematics: ideas(identifier: "survey") { ... on Thematic { id, title, description, numPosts, numContributors, questions { title }, video {title, descriptionTop, descriptionBottom, descriptionSide, htmlCode} } } }', context_value=graphql_request)
    assert json.loads(json.dumps(res.data)) == {
        u'thematics': [{u'description': u'',
                        u'id': thematic_gid,
                        u'numContributors': 0,
                        u'numPosts': 0,
                        u'questions': [],
                        u'title': u'Comprendre les dynamiques et les enjeux',
                        u'video': {u'title': u"Laurent Alexandre, chirurgien et expert en intelligence artificielle nous livre ses prédictions pour le 21e siècle.",
                                   u'descriptionTop': u"Personne ne veut d'un monde où on pourrait manipuler nos cerveaux et où les états pourraient les bidouiller",
                                   u'descriptionBottom': u"Calise de tabarnak",
                                   u'descriptionSide': u"Putain",
                                   u'htmlCode': u"https://something.com",
                                   }}]}


def test_mutation_create_thematic_with_video(graphql_request):
    res = schema.execute(u"""
mutation myFirstMutation {
    createThematic(titleEntries: [
        {value: "Comprendre les dynamiques et les enjeux", localeCode: "fr"},
        {value: "Understanding the dynamics and issues", localeCode: "en"}
        ],
        video: {
            titleEntries:[
                {
                    value: "Laurent Alexandre, chirurgien et expert en intelligence artificielle nous livre ses prédictions pour le 21e siècle.",
                    localeCode:"fr"
                },
            ]
            descriptionEntriesTop: [
                {
                    value: "Personne ne veut d'un monde où on pourrait manipuler nos cerveaux et où les états pourraient les bidouiller",
                    localeCode: "fr"
                },
            ],
            descriptionEntriesBottom: [
                {
                    value:"Calise de tabarnak",
                    localeCode:"fr"
                },
            ],
            descriptionEntriesSide: [
                {
                    value:"Putain",
                    localeCode:"fr"
                },
            ],
            htmlCode: "https://something.com"
        },
        identifier: "survey") {
        thematic {
            ... on Thematic {
                title
                identifier
                video {
                    title
                    titleEntries {
                        localeCode
                        value
                    }
                    htmlCode
                    descriptionTop
                    descriptionBottom
                    descriptionSide
                    descriptionEntriesTop {
                        localeCode
                        value
                    },
                    descriptionEntriesBottom {
                        localeCode
                        value
                    }
                    descriptionEntriesSide {
                        localeCode
                        value
                    }
                }
            }
        }
    }
}
""", context_value=graphql_request)
    assert json.loads(json.dumps(res.data)) == {
        u'createThematic': {
            u'thematic': {
                u'title': u'Understanding the dynamics and issues',
                u'identifier': 'survey',
                u'video': {u'title': u"Laurent Alexandre, chirurgien et expert en intelligence artificielle nous livre ses prédictions pour le 21e siècle.",
                           u'titleEntries': [{
                               u'value': u"Laurent Alexandre, chirurgien et expert en intelligence artificielle nous livre ses prédictions pour le 21e siècle.",
                               u'localeCode': u"fr"
                           }],
                           u'descriptionTop': u"Personne ne veut d'un monde où on pourrait manipuler nos cerveaux et où les états pourraient les bidouiller",
                           u'descriptionBottom': u"Calise de tabarnak",
                           u'descriptionSide': u"Putain",
                           u'descriptionEntriesTop': [{
                               u'value': u"Personne ne veut d'un monde où on pourrait manipuler nos cerveaux et où les états pourraient les bidouiller",
                               u'localeCode': u"fr"
                           }],
                           u'descriptionEntriesBottom': [{
                               u'value': u"Calise de tabarnak",
                               u'localeCode': u"fr"
                           }],
                           u'descriptionEntriesSide': [{
                               u'value': u"Putain",
                               u'localeCode': u"fr"
                           }],
                           u'htmlCode': u"https://something.com",
                           }
            }}}


def test_mutation_create_thematic_multilang_implicit_en(graphql_request, user_language_preference_en_cookie):
    res = schema.execute(u"""
mutation myFirstMutation {
    createThematic(titleEntries: [
        {value: "Comprendre les dynamiques et les enjeux", localeCode: "fr"},
        {value: "Understanding the dynamics and issues", localeCode: "en"}
    ], identifier: "survey") {
        thematic {
            ... on Thematic {
                title,
                identifier
            }
        }
    }
}
""", context_value=graphql_request)
    assert json.loads(json.dumps(res.data)) == {
        u'createThematic': {
            u'thematic': {
                u'title': u'Understanding the dynamics and issues',
                u'identifier': u'survey'
            }}}


def test_mutation_create_thematic_multilang_implicit_fr(graphql_request, user_language_preference_fr_cookie):
    # adding en then fr on purpose, to really test that it looks at user preferences, not just the first original title
    res = schema.execute(u"""
mutation myFirstMutation {
    createThematic(titleEntries: [
        {value: "Understanding the dynamics and issues", localeCode: "en"}
        {value: "Comprendre les dynamiques et les enjeux", localeCode: "fr"},
    ], identifier: "survey") {
        thematic {
            ... on Thematic {
                title,
                identifier
            }
        }
    }
}
""", context_value=graphql_request)
    assert json.loads(json.dumps(res.data)) == {
        u'createThematic': {
            u'thematic': {
                u'title': u'Comprendre les dynamiques et les enjeux',
                u'identifier': u'survey'
            }}}


def test_mutation_create_thematic_multilang_explicit_fr(graphql_request):
    res = schema.execute(u"""
mutation myFirstMutation {
    createThematic(titleEntries: [
        {value: "Comprendre les dynamiques et les enjeux", localeCode: "fr"},
        {value: "Understanding the dynamics and issues", localeCode: "en"}
    ], identifier: "survey") {
        thematic {
            ... on Thematic {
                title(lang: "fr"),
                identifier
            }
        }
    }
}
""", context_value=graphql_request)
    assert json.loads(json.dumps(res.data)) == {
        u'createThematic': {
            u'thematic': {
                u'title': u'Comprendre les dynamiques et les enjeux',
                u'identifier': u'survey'
            }}}


def test_mutation_create_thematic_multilang_explicit_fr_fallback_to_en(graphql_request, user_language_preference_fr_cookie):
    # If we ask for French but don't have this translation, instead of returning null, fallback to english
    res = schema.execute(u"""
mutation myFirstMutation {
    createThematic(titleEntries: [
        {value: "Understanding the dynamics and issues", localeCode: "en"}
    ], identifier: "survey") {
        thematic {
            ... on Thematic {
                title(lang: "fr"),
                identifier
            }
        }
    }
}
""", context_value=graphql_request)
    assert json.loads(json.dumps(res.data)) == {
        u'createThematic': {
            u'thematic': {
                u'title': u'Understanding the dynamics and issues',
                u'identifier': u'survey'
            }}}


def test_mutation_create_thematic_multilang_explicit_fr_fallback_to_en_with_italian_cookie(graphql_request, user_language_preference_it_cookie):
    # If we ask for French but don't have this translation, instead of returning null, fallback to english
    res = schema.execute(u"""
mutation myFirstMutation {
    createThematic(titleEntries:[
        {value:"Understanding the dynamics and issues", localeCode:"en"}
        {value:"Italian...", localeCode:"it"}
    ], identifier:"survey") {
        thematic {
            ... on Thematic {
                title(lang:"fr"),
                identifier
            }
        }
    }
}
""", context_value=graphql_request)
    assert json.loads(json.dumps(res.data)) == {
        u'createThematic': {
            u'thematic': {
                u'title': u'Understanding the dynamics and issues',
                u'identifier': u'survey'
            }}}


def test_mutation_create_thematic_upload_file(graphql_request):
    # create thematic
    import os
    from io import BytesIO

    class FieldStorage(object):
        file = BytesIO(os.urandom(16))
        filename = u'path/to/img.png'
        type = 'image/png'

    graphql_request.POST['variables.img'] = FieldStorage()
    res = schema.execute(u"""
mutation myFirstMutation($img:String) {
    createThematic(titleEntries:[
        {value:"Comprendre les dynamiques et les enjeux", localeCode:"fr"},
        {value:"Understanding the dynamics and issues", localeCode:"en"}
    ],
        identifier:"survey",
        image:$img
    ) {
        thematic {
            ... on Thematic {
                id,
                title(lang:"fr"),
                identifier,
                img {
                    externalUrl
                    mimeType
                }
            }
        }
    }
}
""", context_value=graphql_request, variable_values={"img": u"variables.img"})
    # The test doesn't use the same discussion id (sometimes it's 1, sometimes 8)
    # depending on which tests are executed...
    # py.test assembl -k test_mutation_create_thematic_upload_file
    # returns http://localhost:6543/data/Discussion/1/documents/1/data
    # py.test assembl -k test_graphql
    # returns http://localhost:6543/data/Discussion/8/documents/1/data
#    assert json.loads(json.dumps(res.data)) == {
#        u'createThematic': {
#            u'thematic': {
#                u'title': u'Comprendre les dynamiques et les enjeux',
#                u'identifier': u'survey',
#                u'imgUrl': u'http://localhost:6543/data/Discussion/8/documents/1/data'
#    }}}
#    just assert we have the ends correct:
    assert '/documents/' in res.data['createThematic']['thematic']['img']['externalUrl']
    assert res.data['createThematic']['thematic']['img']['mimeType'] == 'image/png'
    thematic_id = res.data['createThematic']['thematic']['id']

    # and update it to change the image

    class FieldStorage(object):
        file = BytesIO(os.urandom(16))
        filename = u'path/to/img2.png'
        type = 'image/png'

    graphql_request.POST['variables.img'] = FieldStorage()
    res = schema.execute(u"""
mutation myFirstMutation($img:String, $thematicId:ID!) {
    updateThematic(
        id:$thematicId,
        titleEntries:[
            {value:"Comprendre les dynamiques et les enjeux", localeCode:"fr"},
            {value:"Understanding the dynamics and issues", localeCode:"en"}
        ],
        image:$img
    ) {
        thematic {
            ... on Thematic {
                title(lang:"fr"),
                identifier,
                img {
                    externalUrl
                    mimeType
                }
            }
        }
    }
}
""", context_value=graphql_request, variable_values={"thematicId": thematic_id,
                                                     "img": u"variables.img"})
    assert '/documents/' in res.data['updateThematic']['thematic']['img']['externalUrl']
    assert res.data['updateThematic']['thematic']['img']['mimeType'] == 'image/png'


def test_mutation_create_thematic_multilang_explicit_en(graphql_request):
    res = schema.execute(u"""
mutation myFirstMutation {
    createThematic(titleEntries:[
        {value:"Comprendre les dynamiques et les enjeux", localeCode:"fr"},
        {value:"Understanding the dynamics and issues", localeCode:"en"}
    ], identifier:"survey") {
        thematic {
            ... on Thematic {
                title(lang:"en"),
                identifier
            }
        }
    }
}
""", context_value=graphql_request)
    assert json.loads(json.dumps(res.data)) == {
        u'createThematic': {
            u'thematic': {
                u'title': u'Understanding the dynamics and issues',
                u'identifier': 'survey'
            }}}


def test_mutation_create_raise_if_no_title_entries(graphql_request):
    res = schema.execute(u"""
mutation myFirstMutation {
    createThematic(titleEntries:[], identifier:"survey") {
        thematic {
            ... on Thematic {
                title(lang:"en"),
                identifier
            }
        }
    }
}
""", context_value=graphql_request)
    assert json.loads(json.dumps(res.data)) == {
        u'createThematic': None
    }
    assert res.errors[0].args[0] == 'Thematic titleEntries needs at least one entry'


def test_mutation_create_thematic_no_permission(graphql_request):
    graphql_request.authenticated_userid = None
    res = schema.execute(u"""
mutation myFirstMutation {
    createThematic(titleEntries:[{value:"Comprendre les dynamiques et les enjeux", localeCode:"fr"}], identifier:"survey") {
        thematic {
            ... on Thematic {
                title,
                identifier
            }
        }
    }
}
""", context_value=graphql_request)
    assert json.loads(json.dumps(res.data)) == {u'createThematic': None}


def test_mutation_create_thematic_with_questions(graphql_request):
    res = schema.execute(u"""
mutation myFirstMutation {
    createThematic(
        titleEntries:[
            {value:"Comprendre les dynamiques et les enjeux", localeCode:"fr"},
            {value:"Understanding the dynamics and issues", localeCode:"en"}
        ],
        questions:[
            {titleEntries:[
                {value:"Comment qualifiez-vous l'emergence de l'Intelligence Artificielle dans notre société ?", localeCode:"fr"}
            ]},
            {titleEntries:[
                {value:"Seconde question ?", localeCode:"fr"}
            ]},
            {titleEntries:[
                {value:"Troisième question ?", localeCode:"fr"}
            ]},
        ],
        identifier:"survey",
    ) {
        thematic {
            ... on Thematic {
                title(lang:"fr"),
                identifier
                questions { title(lang:"fr") }
            }
        }
    }
}
""", context_value=graphql_request)
    assert json.loads(json.dumps(res.data)) == {
        u'createThematic': {
            u'thematic': {
                u'title': u'Comprendre les dynamiques et les enjeux',
                u'identifier': u'survey',
                u'questions': [
                    {u'title': u"Comment qualifiez-vous l'emergence de l'Intelligence Artificielle dans notre société ?"},
                    {u'title': u"Seconde question ?"},
                    {u'title': u"Troisième question ?"}
                ]
            }}}


def test_delete_thematic(graphql_request, thematic_and_question):
    thematic_id, first_question_id = thematic_and_question
    res = schema.execute(u"""
mutation myFirstMutation {
    deleteThematic(
        thematicId:"%s",
    ) {
        success
    }
}
""" % thematic_id, context_value=graphql_request)
    assert True == res.data['deleteThematic']['success']
    res = schema.execute(
        u'query { thematics: ideas(identifier:"survey") { ... on Thematic { id, title, description, numPosts, numContributors, questions { title }, video {title, descriptionTop, descriptionBottom, htmlCode} } } }', context_value=graphql_request)
    assert json.loads(json.dumps(res.data)) == {u'thematics': []}


def test_delete_thematic_questions(graphql_request, thematic_and_question, test_session):
    thematic_id, first_question_id = thematic_and_question
    res = schema.execute(u"""
mutation myFirstMutation {
    deleteThematic(
        thematicId:"%s",
    ) {
        success
    }
}
""" % thematic_id, context_value=graphql_request)
    assert True == res.data['deleteThematic']['success']
    assert test_session.query(models.Question).filter(models.Question.tombstone_condition()).count() == 0


def test_get_thematic_via_node_query(graphql_request, thematic_and_question):
    thematic_id, first_question_id = thematic_and_question
    res = schema.execute(u"""query {
        node(id:"%s") {
            __typename,
            ... on Thematic {
                title
            }
        }
    }""" % thematic_id, context_value=graphql_request)
    assert json.loads(json.dumps(res.data)) == {
        u'node': {u"__typename": u"Thematic",
                  u"title": u"Understanding the dynamics and issues"}}


def test_get_question_via_node_query(graphql_request, thematic_and_question):
    thematic_id, first_question_id = thematic_and_question
    res = schema.execute(u"""query {
        node(id:"%s") {
            __typename,
            ... on Question {
                title
                numPosts
                numContributors
                totalSentiments
            }
        }
    }""" % first_question_id, context_value=graphql_request)
    assert json.loads(json.dumps(res.data)) == {
        u'node': {
            u"__typename": u"Question",
            u"numPosts": 0,
            u"numContributors": 0,
            u"totalSentiments": 0,
            u"title": u"Comment qualifiez-vous l'emergence de l'Intelligence Artificielle dans notre société ?"}}


def test_get_proposition_post_via_node_query(graphql_request, proposition_id):
    res = schema.execute(u"""query {
        node(id:"%s") {
            __typename,
            ... on Post {
                body
            }
        }
    }""" % proposition_id, context_value=graphql_request)
    assert json.loads(json.dumps(res.data)) == {
        u'node': {u"__typename": u"Post",
                  u"body": u"une proposition..."}}


def test_update_thematic(graphql_request, thematic_and_question):
    thematic_id, first_question_id = thematic_and_question
    # to test the modification, we delete the first letter of each message
    res = schema.execute(u"""
mutation secondMutation {
    updateThematic(
        id: "%s",
        titleEntries:[
            {value:"nderstanding the dynamics and issues", localeCode:"en"},
            {value:"omprendre les dynamiques et les enjeux", localeCode:"fr"}
        ],
        questions:[
            {id: "%s",
             titleEntries:[
                {value:"omment qualifiez-vous l'emergence de l'Intelligence Artificielle dans notre société ?", localeCode:"fr"}
            ]},
        ]
    ) {
        thematic {
            ... on Thematic {
                titleEntries { localeCode value },
                identifier
                questions { titleEntries { localeCode value } }
            }
        }
    }
}
""" % (thematic_id, first_question_id), context_value=graphql_request)
    assert json.loads(json.dumps(res.data)) == {
        u'updateThematic': {
            u'thematic': {
                u'titleEntries': [
                    {u'value': u"nderstanding the dynamics and issues",
                        u'localeCode': u"en"},
                    {u'value': u"omprendre les dynamiques et les enjeux",
                        u'localeCode': u"fr"}
                ],
                u'identifier': u'survey',
                u'questions': [
                    {u'titleEntries': [
                        {u'value': u"omment qualifiez-vous l'emergence de l'Intelligence Artificielle dans notre société ?", u'localeCode': u"fr"}
                    ]},
                ]
            }}}


def test_update_thematic_delete_question(graphql_request, thematic_and_question):
    thematic_id, first_question_id = thematic_and_question
    res = schema.execute(u"""
mutation secondMutation {
    updateThematic(
        id: "%s",
        titleEntries:[
            {value:"Understanding the dynamics and issues", localeCode:"en"},
            {value:"Comprendre les dynamiques et les enjeux", localeCode:"fr"}
        ],
        questions:[
        ],
    ) {
        thematic {
            ... on Thematic {
                titleEntries { localeCode value },
                identifier
                questions { titleEntries { localeCode value } }
            }
        }
    }
}
""" % (thematic_id), context_value=graphql_request)
    assert json.loads(json.dumps(res.data)) == {
        u'updateThematic': {
            u'thematic': {
                u'titleEntries': [
                    {u'value': u"Understanding the dynamics and issues",
                        u'localeCode': u"en"},
                    {u'value': u"Comprendre les dynamiques et les enjeux",
                        u'localeCode': u"fr"}
                ],
                u'identifier': u'survey',
                u'questions': [
                ]
            }}}


def test_update_thematic_delete_video(graphql_request, thematic_with_video_and_question):
    thematic_id, first_question_id = thematic_with_video_and_question
    res = schema.execute(u"""
mutation myMutation($thematicId:ID!) {
    updateThematic(
        id:$thematicId,
        titleEntries:[
            {value:"Understanding the dynamics and issues", localeCode:"en"},
            {value:"Comprendre les dynamiques et les enjeux", localeCode:"fr"}
        ],
        video:{}
    ) {
        thematic {
            ... on Thematic {
                titleEntries { localeCode value },
                identifier
                questions { titleEntries { localeCode value } }
                video {
                    titleEntries {
                        localeCode,
                        value
                },
                descriptionEntriesTop {
                    localeCode,
                    value
                },
                descriptionEntriesBottom {
                    localeCode,
                    value
                },
                descriptionEntriesSide {
                    localeCode,
                    value
                },
                title,
                descriptionTop,
                descriptionBottom,
                descriptionSide,
                htmlCode }
            }
        }
    }
}
""", context_value=graphql_request, variable_values={"thematicId": thematic_id})
    assert json.loads(json.dumps(res.data)) == {
        u'updateThematic': {
            u'thematic': {
                u'titleEntries': [
                    {u'value': u"Understanding the dynamics and issues",
                        u'localeCode': u"en"},
                    {u'value': u"Comprendre les dynamiques et les enjeux",
                        u'localeCode': u"fr"}
                ],
                u'identifier': u'survey',
                u'questions': [
                    {u'titleEntries': [
                        {u'value': u"Comment qualifiez-vous l'emergence de l'Intelligence Artificielle dans notre société ?", u'localeCode': u"fr"}
                    ]},
                ],
                u'video': None
            }}}


def test_update_thematic_add_question(graphql_request, thematic_and_question):
    # This test add a new question and change the questions order
    thematic_id, first_question_id = thematic_and_question
    res = schema.execute(u"""
mutation secondMutation {
    updateThematic(
        id: "%s",
        titleEntries:[
            {value:"Understanding the dynamics and issues", localeCode:"en"},
            {value:"Comprendre les dynamiques et les enjeux", localeCode:"fr"}
        ],
        questions:[
            {titleEntries:[
                {value:"Seconde question mais en premier !", localeCode:"fr"}
            ]},
            {id: "%s",
             titleEntries:[
                {value:"Comment qualifiez-vous l'emergence de l'Intelligence Artificielle dans notre société ?", localeCode:"fr"}
            ]},
        ]
    ) {
        thematic {
            ... on Thematic {
                titleEntries { localeCode value },
                identifier
                questions { titleEntries { localeCode value } }
            }
        }
    }
}
""" % (thematic_id, first_question_id), context_value=graphql_request)
    assert json.loads(json.dumps(res.data)) == {
        u'updateThematic': {
            u'thematic': {
                u'titleEntries': [
                    {u'value': u"Understanding the dynamics and issues",
                        u'localeCode': u"en"},
                    {u'value': u"Comprendre les dynamiques et les enjeux",
                        u'localeCode': u"fr"}
                ],
                u'identifier': u'survey',
                u'questions': [
                    {u'titleEntries': [
                        {u'value': u"Seconde question mais en premier !",
                            u'localeCode': u"fr"}
                    ]},
                    {u'titleEntries': [
                        {u'value': u"Comment qualifiez-vous l'emergence de l'Intelligence Artificielle dans notre société ?", u'localeCode': u"fr"}
                    ]},
                ]
            }}}


def test_update_thematic_delete_image(graphql_request, discussion, thematic_with_image):
    thematic_id = thematic_with_image
    res = schema.execute(u"""
mutation updateThematic($thematicId: ID!, $file: String!) {
    updateThematic(
        id:$thematicId,
        image:$file
    ) {
        thematic {
            ... on Thematic {
                identifier
                img {
                    externalUrl
                }
            }
        }
    }
}
""", context_value=graphql_request, variable_values={ 'thematicId': thematic_id, "file": "TO_DELETE" })

    assert json.loads(json.dumps(res.data)) == {
        u'updateThematic': {
            u'thematic': {
                u'identifier': u'survey',
                u'img': None
            }}}

def test_mutation_create_post(graphql_request, thematic_and_question):
    thematic_id, first_question_id = thematic_and_question
    res = schema.execute(u"""
mutation myFirstMutation {
    createPost(
        ideaId:"%s",
        subject:"Proposition 1",
        body:"une proposition..."
    ) {
        post {
            ... on Post {
                subject,
                body,
                bodyEntries { localeCode value },
                creator { name },
                bodyMimeType
                publicationState
            }
        }
    }
}
""" % first_question_id, context_value=graphql_request)
    assert json.loads(json.dumps(res.data)) == {
        u'createPost': {
            u'post': {
                u'subject': u'Proposition 1',
                u'body': u"une proposition...",
                u'bodyEntries': [{u'value': u"une proposition...", u'localeCode': u'fr'}],
                u'creator': {u'name': u'Mr. Administrator'},
                u'bodyMimeType': u'text/html',
                u'publicationState': u'PUBLISHED'
            }}}


def test_mutation_create_post_without_subject(graphql_request, thematic_and_question):
    thematic_id, first_question_id = thematic_and_question
    res = schema.execute(u"""
mutation myFirstMutation {
    createPost(
        ideaId:"%s",
        body:"une proposition..."
    ) {
        post {
            ... on Post {
                subject,
                body,
                creator { name },
                mySentiment
            }
        }
    }
}
""" % first_question_id, context_value=graphql_request)
    assert json.loads(json.dumps(res.data)) == {
        u'createPost': {
            u'post': {
                u'subject': u'Proposal',
                u'body': u"une proposition...",
                u'creator': {u'name': u'Mr. Administrator'},
                u'mySentiment': None
            }}}


def test_mutation_create_post_on_column(graphql_request,
                                        test_session,
                                        idea_message_column_positive):
    idea_id = to_global_id('Idea', idea_message_column_positive.idea_id)
    classifier = idea_message_column_positive.message_classifier
    res = schema.execute(u"""
mutation myFirstMutation {
    createPost(
        ideaId:"%s",
        subject:"Proposition 1",
        body:"une proposition...",
        messageClassifier:"%s"
    ) {
        post {
            ... on Post {
                subject
                body
                bodyEntries { localeCode value }
                creator { name }
                bodyMimeType
                publicationState
                messageClassifier
            }
        }
    }
}
""" % (idea_id, classifier), context_value=graphql_request)

    # Must remove the ICL before test completes in order to avoid db constraint
    # on idea fixture removal
    icl = test_session.query(models.IdeaRelatedPostLink).\
        filter_by(idea_id=idea_message_column_positive.idea_id).first()
    test_session.delete(icl)
    test_session.flush()

    assert json.loads(json.dumps(res.data)) == {
        u'createPost': {
            u'post': {
                u'subject': u'Proposition 1',
                u'body': u"une proposition...",
                u'bodyEntries': [{u'value': u"une proposition...", u'localeCode': u'fr'}],
                u'creator': {u'name': u'Mr. Administrator'},
                u'bodyMimeType': u'text/html',
                u'publicationState': u'PUBLISHED',
                u'messageClassifier': classifier
            }}}


def test_mutation_delete_post(graphql_request, top_post_in_thread_phase):
    res = schema.execute(u"""
mutation myMutation($postId: ID!) {
    deletePost(postId: $postId) {
        post {
            ... on Post {
                subject
                body
                parentId
                creator { name }
                publicationState
            }
        }
    }
}
""", context_value=graphql_request, variable_values={"postId": top_post_in_thread_phase})
    assert json.loads(json.dumps(res.data)) == {
        u'deletePost': {
            u'post': {
                u'subject': u'Manger des choux à la crème',
                u'body': None,
                u'parentId': None,
                u'creator': {u'name': u'Mr. Administrator'},
                u'publicationState': 'DELETED_BY_USER'
            }}}


def test_mutation_undelete_post(graphql_request, top_post_in_thread_phase):
    res = schema.execute(u"""
mutation myMutation($postId: ID!) {
    deletePost(postId: $postId) {
        post {
            ... on Post {
                subject
                body
                parentId
                creator { name }
                publicationState
            }
        }
    }
}
""", context_value=graphql_request, variable_values={"postId": top_post_in_thread_phase})
    assert json.loads(json.dumps(res.data)) == {
        u'deletePost': {
            u'post': {
                u'subject': u'Manger des choux à la crème',
                u'body': None,
                u'parentId': None,
                u'creator': {u'name': u'Mr. Administrator'},
                u'publicationState': 'DELETED_BY_USER'
            }}}
    res = schema.execute(u"""
mutation myMutation($postId: ID!) {
    undeletePost(postId: $postId) {
        post {
            ... on Post {
                subject
                body
                parentId
                creator { name }
                publicationState
            }
        }
    }
}
""", context_value=graphql_request, variable_values={"postId": top_post_in_thread_phase})
    assert json.loads(json.dumps(res.data)) == {
        u'undeletePost': {
            u'post': {
                u'subject': u'Manger des choux à la crème',
                u'body': u"Je recommande de manger des choux à la crème, c'est très bon, et ça permet de maintenir l'industrie de la patisserie française.",
                u'parentId': None,
                u'creator': {u'name': u'Mr. Administrator'},
                u'publicationState': 'PUBLISHED'
            }}}


def test_mutation_add_sentiment(graphql_request, thematic_and_question, proposition_id):
    res = schema.execute(u"""
mutation myFirstMutation {
    addSentiment(
        postId:"%s",
        type:LIKE
    ) {
      post {
        ... on Post {
          sentimentCounts {
            like
            disagree
          }
          mySentiment
        }
      }
    }
}
""" % proposition_id, context_value=graphql_request)
    assert json.loads(json.dumps(res.data)) == {
        u'addSentiment': {
            u'post': {
                u'sentimentCounts': {
                    u'like': 1,
                    u'disagree': 0,
                },
                u'mySentiment': u"LIKE"
            }
        }
    }
    res = schema.execute(u"""
query {
  node(id: "%s") {
    ... on Question {
      numPosts
      numContributors
      totalSentiments
    }
  }
}
""" % thematic_and_question[1], context_value=graphql_request)
    assert res.data['node']['numPosts'] == 1
    assert res.data['node']['numContributors'] == 1
    assert res.data['node']['totalSentiments'] == 1
    res = schema.execute(u"""
query {
  node(id: "%s") {
    ... on Thematic {
      numPosts
      numContributors
      totalSentiments
    }
  }
}
""" % thematic_and_question[0], context_value=graphql_request)
    assert res.data['node']['numPosts'] == 1
    assert res.data['node']['numContributors'] == 1
    assert res.data['node']['totalSentiments'] == 1


def test_mutation_add_sentiment_like_then_disagree(graphql_request, thematic_and_question, proposition_id):
    res = schema.execute(u"""
mutation myFirstMutation {
    addSentiment(
        postId:"%s",
        type:LIKE
    ) {
    }
}
""" % proposition_id, context_value=graphql_request)
    res = schema.execute(u"""
mutation myFirstMutation {
    addSentiment(
        postId:"%s",
        type:DISAGREE
    ) {
      post {
        ... on Post {
          sentimentCounts {
            like
            disagree
          }
          mySentiment
        }
      }
    }
}
""" % proposition_id, context_value=graphql_request)
    assert json.loads(json.dumps(res.data)) == {
        u'addSentiment': {
            u'post': {
                u'sentimentCounts': {
                    u'like': 0,
                    u'disagree': 1,
                },
                u'mySentiment': u"DISAGREE"
            }
        }
    }
    res = schema.execute(u"""
query {
  node(id: "%s") {
    ... on Question {
      numPosts
      numContributors
      totalSentiments
    }
  }
}
""" % thematic_and_question[1], context_value=graphql_request)
    assert res.data['node']['numPosts'] == 1
    assert res.data['node']['numContributors'] == 1
    assert res.data['node']['totalSentiments'] == 1
    res = schema.execute(u"""
query {
  node(id: "%s") {
    ... on Thematic {
      numPosts
      numContributors
      totalSentiments
    }
  }
}
""" % thematic_and_question[0], context_value=graphql_request)
    assert res.data['node']['numPosts'] == 1
    assert res.data['node']['numContributors'] == 1
    assert res.data['node']['totalSentiments'] == 1


def test_mutation_add_sentiment_like_twice(graphql_request, thematic_and_question, proposition_id):
    res = schema.execute(u"""
mutation myFirstMutation {
    addSentiment(
        postId:"%s",
        type:LIKE
    ) {
    }
}
""" % proposition_id, context_value=graphql_request)
    res = schema.execute(u"""
mutation myFirstMutation {
    addSentiment(
        postId:"%s",
        type:LIKE
    ) {
      post {
        ... on Post {
          sentimentCounts {
            like
            disagree
          }
          mySentiment
        }
      }
    }
}
""" % proposition_id, context_value=graphql_request)
    assert json.loads(json.dumps(res.data)) == {
        u'addSentiment': {
            u'post': {
                u'sentimentCounts': {
                    u'like': 1,
                    u'disagree': 0,
                },
                u'mySentiment': u"LIKE"
            }
        }
    }
    res = schema.execute(u"""
query {
  node(id: "%s") {
    ... on Question {
      numPosts
      numContributors
      totalSentiments
    }
  }
}
""" % thematic_and_question[1], context_value=graphql_request)
    assert res.data['node']['numPosts'] == 1
    assert res.data['node']['numContributors'] == 1
    assert res.data['node']['totalSentiments'] == 1
    res = schema.execute(u"""
query {
  node(id: "%s") {
    ... on Thematic {
      numPosts
      numContributors
      totalSentiments
    }
  }
}
""" % thematic_and_question[0], context_value=graphql_request)
    assert res.data['node']['numPosts'] == 1
    assert res.data['node']['numContributors'] == 1
    assert res.data['node']['totalSentiments'] == 1


def test_mutation_delete_sentiment(graphql_request, thematic_and_question, proposition_id):
    res = schema.execute(u"""
mutation myFirstMutation {
    addSentiment(
        postId: "%s",
        type: LIKE
    ) {
      post {
        ... on Post {
          sentimentCounts {
            like
            disagree
          }
          mySentiment
        }
      }
    }
}
""" % proposition_id, context_value=graphql_request)
    res = schema.execute(u"""
mutation myFirstMutation {
    deleteSentiment(
        postId: "%s",
    ) {
      post {
        ... on Post {
          sentimentCounts {
            like
            disagree
          }
          mySentiment
        }
      }
    }
}
""" % proposition_id, context_value=graphql_request)
    assert json.loads(json.dumps(res.data)) == {
        u'deleteSentiment': {
            u'post': {
                u'sentimentCounts': {
                    u'like': 0,
                    u'disagree': 0,
                },
                u'mySentiment': None
            }
        }
    }
    res = schema.execute(u"""
query {
  node(id: "%s") {
    ... on Question {
      numPosts
      numContributors
      totalSentiments
    }
  }
}
""" % thematic_and_question[1], context_value=graphql_request)
    assert res.data['node']['numPosts'] == 1
    assert res.data['node']['numContributors'] == 1
    assert res.data['node']['totalSentiments'] == 0
    res = schema.execute(u"""
query {
  node(id: "%s") {
    ... on Thematic {
      numPosts
      numContributors
      totalSentiments
    }
  }
}
""" % thematic_and_question[0], context_value=graphql_request)
    assert res.data['node']['numPosts'] == 1
    assert res.data['node']['numContributors'] == 1
    assert res.data['node']['totalSentiments'] == 0


def test_mutation_create_top_post(graphql_request, idea_in_thread_phase):
    idea_id = idea_in_thread_phase
    res = schema.execute(u"""
mutation createPost($ideaId: ID!, $subject: String, $body: String!, $parentId: ID) {
  createPost(ideaId: $ideaId, subject: $subject, body: $body, parentId: $parentId) {
        post {
            ... on Post {
                subject,
                body,
                parentId,
                creator { name },
                indirectIdeaContentLinks { idea { id } }
            }
        }
    }
}
""", context_value=graphql_request, variable_values={
        "ideaId": idea_id,
        "parentId": None,
        "subject": u"Proposition 1",
        "body": u"une proposition..."
    })
    assert json.loads(json.dumps(res.data)) == {
        u'createPost': {
            u'post': {
                u'subject': u'Proposition 1',
                u'body': u"une proposition...",
                u'parentId': None,
                u'creator': {u'name': u'Mr. Administrator'},
                u'indirectIdeaContentLinks': [{u'idea': {u'id': idea_in_thread_phase}}]
            }}}


def test_mutation_create_reply_post(graphql_request, idea_in_thread_phase, top_post_in_thread_phase):
    idea_id = idea_in_thread_phase
    in_reply_to_post_id = top_post_in_thread_phase
    res = schema.execute(u"""
mutation createPost($ideaId: ID!, $subject: String, $body: String!, $parentId: ID) {
  createPost(ideaId: $ideaId, subject: $subject, body: $body, parentId: $parentId) {
        post {
            ... on Post {
                subject,
                body,
                parentId,
                creator { name },
                indirectIdeaContentLinks { idea { id } }
            }
        }
    }
}
""", context_value=graphql_request, variable_values={
        "ideaId": idea_id,
        "parentId": in_reply_to_post_id,
        "subject": u"Proposition 1",
        "body": u"une proposition..."
    })
    assert json.loads(json.dumps(res.data)) == {
        u'createPost': {
            u'post': {
                u'subject': u'Proposition 1',
                u'body': u"une proposition...",
                u'parentId': in_reply_to_post_id,
                u'creator': {u'name': u'Mr. Administrator'},
                u'indirectIdeaContentLinks': [{u'idea': {u'id': idea_in_thread_phase}}]
            }}}


def test_mutation_create_reply_post_no_subject(graphql_request, idea_in_thread_phase, top_post_in_thread_phase):
    idea_id = idea_in_thread_phase
    in_reply_to_post_id = top_post_in_thread_phase
    res = schema.execute(u"""
mutation myFirstMutation {
    createPost(
        ideaId: "%s",
        parentId: "%s",
        body: "une proposition..."
    ) {
        post {
            ... on Post {
                subject,
                body,
                parentId,
                creator { name },
            }
        }
    }
}
""" % (idea_id, in_reply_to_post_id), context_value=graphql_request)
    assert json.loads(json.dumps(res.data)) == {
        u'createPost': {
            u'post': {
                u'subject': u'Re: Manger des choux à la crème',
                u'body': u"une proposition...",
                u'parentId': in_reply_to_post_id,
                u'creator': {u'name': u'Mr. Administrator'}
            }}}


SIMPLIFIED_QUESTION_POSTS_QUERY = u"""
query QuestionPosts($id: ID!, $first: Int, $last: Int, $after: String, $before: String, $fromNode: ID) {
  node(id: $id) {
    ... on Question {
      title
      posts(first: $first, last: $last, after: $after, before: $before, fromNode: $fromNode) {
        pageInfo {
          hasPreviousPage
          hasNextPage
        }
        edges {
          node {
            ... on Post {
              body
            }
          }
        }
      }
    }
  }
}
"""

def test_get_proposals(graphql_request, thematic_and_question, proposals):
    thematic_id, first_question_id = thematic_and_question
    res = schema.execute(
        SIMPLIFIED_QUESTION_POSTS_QUERY,
        context_value=graphql_request,
        variable_values={"id": first_question_id, "first": 10, "after": "", "fromNode": None})
    assert json.loads(json.dumps(res.data)) == {
        u'node': {
            u'title': u"Comment qualifiez-vous l'emergence de l'Intelligence Artificielle dans notre soci\xe9t\xe9 ?",
            u'posts': {
                u'pageInfo': {
                    u'hasPreviousPage': False,
                    u'hasNextPage': True
                },
                u'edges': [{u'node': {u'body': u'une proposition 14'}},
                           {u'node': {u'body': u'une proposition 13'}},
                           {u'node': {u'body': u'une proposition 12'}},
                           {u'node': {u'body': u'une proposition 11'}},
                           {u'node': {u'body': u'une proposition 10'}},
                           {u'node': {u'body': u'une proposition 9'}},
                           {u'node': {u'body': u'une proposition 8'}},
                           {u'node': {u'body': u'une proposition 7'}},
                           {u'node': {u'body': u'une proposition 6'}},
                           {u'node': {u'body': u'une proposition 5'}}]
            }
        }
    }


def test_get_proposals_after(graphql_request, thematic_and_question, proposals):
    thematic_id, first_question_id = thematic_and_question
    res = schema.execute(
        SIMPLIFIED_QUESTION_POSTS_QUERY,
        context_value=graphql_request,
        variable_values={"id": first_question_id, "first": 10, "after": offset_to_cursor(9), "fromNode": None})
    assert json.loads(json.dumps(res.data)) == {
        u'node': {
            u'title': u"Comment qualifiez-vous l'emergence de l'Intelligence Artificielle dans notre soci\xe9t\xe9 ?",
            u'posts': {
                u'pageInfo': {
                    u'hasPreviousPage': False,  # when we specify `after`, this is always False
                    u'hasNextPage': False
                },
                u'edges': [{u'node': {u'body': u'une proposition 4'}},
                           {u'node': {u'body': u'une proposition 3'}},
                           {u'node': {u'body': u'une proposition 2'}},
                           {u'node': {u'body': u'une proposition 1'}},
                           {u'node': {u'body': u'une proposition 0'}}]
            }
        }
    }


def test_get_proposals_before(graphql_request, thematic_and_question, proposals):
    thematic_id, first_question_id = thematic_and_question
    res = schema.execute(
        SIMPLIFIED_QUESTION_POSTS_QUERY,
        context_value=graphql_request,
        variable_values={"id": first_question_id, "first": None, "last": 5, "after": '', "before": offset_to_cursor(11), "fromNode": None})
    # don't use both first and last as int, you will get weird results
    assert json.loads(json.dumps(res.data)) == {
        u'node': {
            u'title': u"Comment qualifiez-vous l'emergence de l'Intelligence Artificielle dans notre soci\xe9t\xe9 ?",
            u'posts': {
                u'pageInfo': {
                    u'hasPreviousPage': True,
                    u'hasNextPage': False  # when we specify `before`, this is always False
                },
                u'edges': [{u'node': {u'body': u'une proposition 8'}},
                           {u'node': {u'body': u'une proposition 7'}},
                           {u'node': {u'body': u'une proposition 6'}},
                           {u'node': {u'body': u'une proposition 5'}},
                           {u'node': {u'body': u'une proposition 4'}}]
            }
        }
    }


def test_get_proposals_from_node(graphql_request, thematic_and_question, proposals):
    thematic_id, first_question_id = thematic_and_question
    res = schema.execute(
        SIMPLIFIED_QUESTION_POSTS_QUERY,
        context_value=graphql_request,
        variable_values={"id": first_question_id, "first": 10, "after": "", "fromNode": proposals[4]})
    assert json.loads(json.dumps(res.data)) == {
        u'node': {
            u'title': u"Comment qualifiez-vous l'emergence de l'Intelligence Artificielle dans notre soci\xe9t\xe9 ?",
            u'posts': {
                u'pageInfo': {
                    u'hasPreviousPage': False,
                    u'hasNextPage': False
                },
                u'edges': [{u'node': {u'body': u'une proposition 4'}},
                           {u'node': {u'body': u'une proposition 3'}},
                           {u'node': {u'body': u'une proposition 2'}},
                           {u'node': {u'body': u'une proposition 1'}},
                           {u'node': {u'body': u'une proposition 0'}}]
            }
        }
    }


def test_get_proposals_random(graphql_request, thematic_and_question, proposals):
    # verify that the posts are in a random order even if we get them all
    thematic_id, first_question_id = thematic_and_question
    res = schema.execute(u"""query {
        node(id: "%s") {
            ... on Question {
                title,
                posts(first: 20, random: true) {
                    edges {
                        node {
                        ... on Post { body } } } } } } }""" % first_question_id, context_value=graphql_request)
    assert res.errors is None
    assert json.loads(json.dumps(res.data)) != {
        u'node': {
            u"title": u"Comment qualifiez-vous l'emergence de l'Intelligence Artificielle dans notre soci\xe9t\xe9 ?",
            u"posts":
            {u'edges': [{u'node': {u'body': u'une proposition 14'}},
                        {u'node': {u'body': u'une proposition 0'}},
                        {u'node': {u'body': u'une proposition 1'}},
                        {u'node': {u'body': u'une proposition 2'}},
                        {u'node': {u'body': u'une proposition 3'}},
                        {u'node': {u'body': u'une proposition 4'}},
                        {u'node': {u'body': u'une proposition 5'}},
                        {u'node': {u'body': u'une proposition 6'}},
                        {u'node': {u'body': u'une proposition 7'}},
                        {u'node': {u'body': u'une proposition 8'}},
                        {u'node': {u'body': u'une proposition 9'}},
                        {u'node': {u'body': u'une proposition 10'}},
                        {u'node': {u'body': u'une proposition 11'}},
                        {u'node': {u'body': u'une proposition 12'}},
                        {u'node': {u'body': u'une proposition 13'}},
                        ]},
        }}


def test_get_thematics_order(graphql_request, thematic_with_video_and_question, second_thematic_with_questions):

    res = schema.execute(
        u'query { thematics: ideas(identifier: "survey") { ... on Thematic { title, order } } }',
        context_value=graphql_request)
    assert json.loads(json.dumps(res.data)) == {
        u'thematics': [
            {u'order': 1.0, u'title': u'Understanding the dynamics and issues'},
            {u'order': 2.0, u'title': u'AI revolution'}
        ]
    }


def test_thematics_change_order(graphql_request, thematic_with_video_and_question, second_thematic_with_questions):
    thematic_id, _ = thematic_with_video_and_question
    res = schema.execute(u"""
mutation myMutation($thematicId:ID!, $order:Float!) {
    updateThematic(
        id: $thematicId,
        order: $order
    ) {
        thematic {
            ... on Thematic {
                order
            }
        }
    }
}
""", context_value=graphql_request, variable_values={"thematicId": thematic_id,
                                                     "order": 3.0})

    res = schema.execute(
        u'query { thematics: ideas(identifier: "survey") { ... on Thematic { title, order } } }',
        context_value=graphql_request)
    assert json.loads(json.dumps(res.data)) == {
        u'thematics': [
            {u'order': 2.0, u'title': u'AI revolution'},
            {u'order': 3.0, u'title': u'Understanding the dynamics and issues'}
        ]
    }


def test_insert_thematic_between_two_thematics(graphql_request, thematic_with_video_and_question, second_thematic_with_questions):
    res = schema.execute(u"""
mutation myMutation {
    createThematic(
        titleEntries: [
            {value: "AI for the common good", localeCode: "en"}
        ],
        identifier: "survey",
        order: 1.5
    ) {
        thematic {
            ... on Thematic {
                order
            }
        }
    }
}
""", context_value=graphql_request)

    res = schema.execute(
        u'query { thematics: ideas(identifier: "survey") { ... on Thematic { title, order } } }',
        context_value=graphql_request)
    assert json.loads(json.dumps(res.data)) == {
        u'thematics': [
            {u'order': 1.0, u'title': u'Understanding the dynamics and issues'},
            {u'order': 1.5, u'title': u'AI for the common good'},
            {u'order': 2.0, u'title': u'AI revolution'}
        ]
    }


def test_mutation_update_post(graphql_request, top_post_in_thread_phase):
    res = schema.execute(u"""
mutation myMutation($postId: ID!, $subject: String, $body: String!) {
    updatePost(
        postId: $postId,
        subject: $subject,
        body: $body
    ) {
        post {
            ... on Post {
                subject
                body
            }
        }
    }
}
""", context_value=graphql_request,
                         variable_values={
                             "postId": top_post_in_thread_phase,
                             "subject": u"modified proposal",
                             "body": u"the modified proposal..."
                         })
    assert json.loads(json.dumps(res.data)) == {
        u'updatePost': {
            u'post': {
                u'subject': u'modified proposal',
                u'body': u"the modified proposal...",
            }}}


def test_mutation_update_post_with_subject_null(graphql_request, top_post_in_thread_phase):
    res = schema.execute(u"""
mutation myMutation($postId: ID!, $subject: String, $body: String!) {
    updatePost(
        postId: $postId,
        subject: $subject,
        body: $body
    ) {
        post {
            ... on Post {
                subject
                body
            }
        }
    }
}
""", context_value=graphql_request,
                         variable_values={
                             "postId": top_post_in_thread_phase,
                             "body": u"the modified proposal..."
                         })
    assert json.loads(json.dumps(res.data)) == {
        u'updatePost': {
            u'post': {
                u'subject': u'Manger des choux à la crème',
                u'body': u"the modified proposal...",
            }}}


def test_mutation_update_post_with_subject_empty_string(graphql_request, idea_in_thread_phase, top_post_in_thread_phase):
    res = schema.execute(u"""
mutation myMutation($postId: ID!, $subject: String, $body: String!) {
    updatePost(
        postId: $postId,
        subject: $subject,
        body: $body
    ) {
        post {
            ... on Post {
                subject
                body
            }
        }
    }
}
""", context_value=graphql_request,
                         variable_values={
                             "postId": top_post_in_thread_phase,
                             "subject": u"",
                             "body": u"the modified proposal..."
                         })
    assert json.loads(json.dumps(res.data)) == {
        u'updatePost': {
            u'post': {
                u'subject': u'Manger des choux à la crème',
                u'body': u"the modified proposal...",
            }}}


def test_mutation_upload_document(graphql_request, idea_in_thread_phase):
    import os
    from io import BytesIO

    class FieldStorage(object):
        file = BytesIO(os.urandom(16))
        filename = u'path/to/image.png'
        type = 'image/png'

    graphql_request.POST['variables.file'] = FieldStorage()
    res = schema.execute(u"""
mutation uploadDocument($file: String!) {
    uploadDocument(
        file: $file,
    ) {
        document {
            ... on Document {
                id
                externalUrl
            }
        }
    }
}
""", context_value=graphql_request,
                         variable_values={
                             "file": "variables.file"
                         })
    assert res.data['uploadDocument']['document']['id'] is not None
    assert res.data['uploadDocument']['document']['externalUrl'].endswith(
        '/data')
#    assert json.loads(json.dumps(res.data)) == {
#        u'uploadDocument': {
#            u'document': {
#                u'id': u'1',
#                u'externalUrl': u'http://localhost:6543/data/Discussion/1/documents/1/data',
#            }
#        }
#    }


def test_mutation_delete_post_attachment(graphql_request, idea_in_thread_phase, top_post_in_thread_phase):
    # TODO: write a test fixture that returns a post attachment id and remove AddPostAttachmentMutation everywhere
    import os
    from io import BytesIO

    class FieldStorage(object):
        file = BytesIO(os.urandom(16))
        filename = u'path/to/image.png'
        type = 'image/png'

    graphql_request.POST['variables.attachment'] = FieldStorage()
    res = schema.execute(u"""
mutation addPostAttachment($postId: ID!, $file: String!) {
    addPostAttachment(
        postId: $postId,
        file: $file,
    ) {
        post {
            ... on Post {
                attachments {
                    id
                }
            }
        }
    }
}
""", context_value=graphql_request,
                         variable_values={
                             "postId": top_post_in_thread_phase,
                             "file": "variables.attachment"
                         })
    assert res.errors is None
    attachment_id = res.data['addPostAttachment']['post']['attachments'][-1]['id']

    res = schema.execute(u"""
mutation deletePostAttachment($postId: ID!, $attachmentId: Int!) {
    deletePostAttachment(
        postId: $postId,
        attachmentId: $attachmentId,
    ) {
        post {
            ... on Post {
                attachments {
                    document {
                        id
                        title
                        externalUrl
                        mimeType
                    }
                }
            }
        }
    }
}
""", context_value=graphql_request,
                         variable_values={
                             "attachmentId": attachment_id,
                             "postId": top_post_in_thread_phase,
                         })

    assert json.loads(json.dumps(res.data)) == {
        u'deletePostAttachment': {
            u'post': {
                u'attachments': []
            }
        }
    }


def test_query_discussion_preferences(graphql_request,
                                      discussion_with_lang_prefs):
    res = schema.execute(u"""
query { discussionPreferences { languages { locale, name(inLocale:"fr"), nativeName } } } """, context_value=graphql_request)
    assert json.loads(json.dumps(res.data)) == {
        u'discussionPreferences': {
            u'languages':
                [
                    {u'locale': u'en', u'name': u'anglais',
                        u'nativeName': u'English'},
                    {u'locale': u'fr', u'name': u'français',
                        u'nativeName': u'français'},
                    {u'locale': u'ja', u'name': u'japonais',
                        u'nativeName': u'日本語 (にほんご)'},
                ]
        }
    }


@pytest.mark.xfail
def test_query_default_discussion_preferences(graphql_request,
                                              discussion_with_lang_prefs):
    res = schema.execute(u"""
query { defaultPreferences { languages { locale, name(inLocale: "fr") } } }""", context_value=graphql_request)
    assert json.loads(json.dumps(res.data)) == {
        u'defaultPreferences': {
            u'languages': [
                {u'locale': u'fr', u'name': u'français'},
                {u'locale': u'en', u'name': u'anglais'}
            ]
        }
    }


def test_mutation_update_language_preference(graphql_request,
                                             discussion_with_lang_prefs):
    res = schema.execute(u"""
mutation myMutation($languages: [String]!) {
    updateDiscussionPreferences(languages: $languages) {
        preferences {
            languages {
                locale
            }
        }
    }
}
""", context_value=graphql_request,
                         variable_values={
                             "languages": ["ja", "de"]
                         })
    assert json.loads(json.dumps(res.data)) == {
        u'updateDiscussionPreferences': {
            u'preferences': {
                u'languages': [
                    {u'locale': u'ja'},
                    {u'locale': u'de'}
                ]
            }
        }}


def test_mutation_update_language_preference_empty_list(
        graphql_request, discussion_with_lang_prefs):
    res = schema.execute(u"""
mutation myMutation($languages: [String]!) {
    updateDiscussionPreferences(languages: $languages) {
        preferences {
            languages {
                locale
            }
        }
    }
}
""", context_value=graphql_request,
                         variable_values={
                             "languages": []
                         })
    assert res.errors is not None


def test_query_post_message_classifier(graphql_request,
                                       root_post_1_with_positive_message_classifier):
    post_id = to_global_id('Post',
                           root_post_1_with_positive_message_classifier.id)
    res = schema.execute(u"""query {
        node(id: "%s") {
            ... on Post {
                messageClassifier
            }
        }
    }""" % (post_id), context_value=graphql_request)
    assert json.loads(json.dumps(res.data)) == {
        u"node": {
            u"messageClassifier": u'positive'
        }
    }


def test_query_post_no_message_classifier(graphql_request,
                                          idea_message_column_positive,
                                          root_post_1):
    post_id = to_global_id('Post', root_post_1.id)
    res = schema.execute(u"""query {
        node(id:"%s") {
            ... on Post {
                messageClassifier
            }
        }
    }""" % (post_id), context_value=graphql_request)
    assert json.loads(json.dumps(res.data)) == {
        u"node": {
            u"messageClassifier": None
        }
    }


def test_query_number_of_posts_on_column(
        graphql_request, idea_message_column_positive,
        root_post_en_under_positive_column_of_idea):

    idea_id = to_global_id('Idea', idea_message_column_positive.idea_id)
    res = schema.execute(u"""
query ColumnsQuery($id: ID!, $lang: String!) {
  idea: node(id: $id) {
    ... on Idea {
      id
      messageColumns {
        color
        columnSynthesis {
          subject(lang: $lang)
          body(lang: $lang)
        }
        index
        messageClassifier
        name(lang: $lang)
        numPosts
        title(lang: $lang)
      }
    }
  }
}""", context_value=graphql_request, variable_values={'id': idea_id, 'lang': 'en'})
    res_data = json.loads(json.dumps(res.data))
    assert res_data[u'idea'][u'messageColumns'][0][u'numPosts'] == 1


def test_query_number_of_posts_on_multiple_columns(
        graphql_request,
        idea_message_column_positive,
        idea_message_column_negative,
        root_post_en_under_positive_column_of_idea,
        root_post_en_under_negative_column_of_idea):

    idea_id = to_global_id('Idea', idea_message_column_positive.idea_id)
    res = schema.execute(u"""
query ColumnsQuery($id: ID!, $lang: String!) {
  idea: node(id: $id) {
    ... on Idea {
      id
      messageColumns {
        color
        columnSynthesis {
          subject(lang: $lang)
          body(lang: $lang)
        }
        index
        messageClassifier
        name(lang: $lang)
        numPosts
        title(lang: $lang)
      }
    }
  }
}""", context_value=graphql_request, variable_values={'id': idea_id, 'lang': 'en'})
    res_data = json.loads(json.dumps(res.data))
    columns = res_data[u'idea'][u'messageColumns']
    assert len(columns) == 2
    positive = filter(lambda c: c[u"messageClassifier"] ==
                      idea_message_column_positive.message_classifier, columns)[0]
    negative = filter(lambda c: c[u"messageClassifier"] ==
                      idea_message_column_negative.message_classifier, columns)[0]
    assert positive == {
        u'color': u'green',
        u'columnSynthesis': {
            u'subject': u'Be positive!',
            u'body': u'This is a positive header',
        },
        u'index': 0,
        u'messageClassifier': u'positive',
        u'name': u'Say my name',
        u'numPosts': 1,
        u'title': u'Add your point of view in favor of the theme'
    }
    assert negative == {
        u'color': u'red',
        u'columnSynthesis': {
            u'subject': u'Be negative!',
            u'body': u'This is a negative header',
        },
        u'index': 1,
        u'messageClassifier': u'negative',
        u'name': u'My other name',
        u'numPosts': 1,
        u'title': u'Add your point of view against the theme'
    }


def test_query_discussion_sentiments_count(
        graphql_request):
    res = schema.execute(u"""query {
        totalSentiments
    }""", context_value=graphql_request)
    res_data = json.loads(json.dumps(res.data))
    count = res_data[u"totalSentiments"]
    assert count == 0


def test_query_sections(sections, graphql_request):
    from assembl.models.section import SectionTypesEnum
    query = u"""
query { sections {
    id
    title(lang: "en")
    titleEntries {
        localeCode
        value
    }
    url
    sectionType
    order
} }"""
    res = schema.execute(query, context_value=graphql_request)
    assert len(res.data['sections']) == 6
    assert res.data['sections'][0]['title'] == u'Home'
    assert res.data['sections'][0]['titleEntries'][0]['localeCode'] == u'en'
    assert res.data['sections'][0]['titleEntries'][0]['value'] == u'Home'
    assert res.data['sections'][0]['url'] is None
    assert res.data['sections'][0]['sectionType'] == SectionTypesEnum.HOMEPAGE.value
    assert res.data['sections'][0]['order'] == 0.0

    assert res.data['sections'][-2]['url'] == u'http://www.gnu.org'
    assert res.data['sections'][-2]['sectionType'] == SectionTypesEnum.CUSTOM.value
    assert res.data['sections'][-2]['order'] == 4.0
    assert res.data['sections'][-2]['title'] == u'GNU is not Unix'
    # res.data['sections'][-1] is the Administration section


def test_mutation_create_section(sections, graphql_request):
    from assembl.models.section import SectionTypesEnum
    title_entries = [
        {u"value": u"Section personnalisée", u"localeCode": u"fr"},
        {u"value": u"Custom section", u"localeCode": u"en"}
    ]
    variables = {
        "titleEntries": title_entries,
        "url": u"http://www.example.com",
        "order": 5.0
    }
    res = schema.execute(u"""
mutation createSection($titleEntries: [LangStringEntryInput!]!, $url:String, $order:Float) {
    createSection(
        titleEntries: $titleEntries, url: $url, order: $order
    ) {
        section {
            title(lang: "fr")
            url
            sectionType
            order
        }
    }
}
""", context_value=graphql_request, variable_values=variables)
    result = res.data
    assert result is not None
    assert result['createSection'] is not None
    section = result['createSection']['section']
    assert section['title'] == u'Section personnalisée'
    assert section['url'] == u"http://www.example.com"
    assert section['sectionType'] == SectionTypesEnum.CUSTOM.value
    assert section['order'] == 5.0


def test_mutation_delete_section(sections, graphql_request):
    custom_section_id = to_global_id('Section', sections[-1].id)
    variables = {
        'id': custom_section_id
    }
    res = schema.execute(u"""
mutation deleteSection($id: ID!) {
    deleteSection(
        sectionId:$id
    ) {
        success
    }
}
""", context_value=graphql_request, variable_values=variables)
    result = res.data
    assert result is not None
    assert result['deleteSection'] is not None
    assert result['deleteSection']['success']

    query = u"""
query { sections {
    id
} }"""
    res = schema.execute(query, context_value=graphql_request)
    result = res.data
    assert result is not None
    assert len(result['sections']) == 5


def test_mutation_delete_section_fails_for_non_custom_sections(graphql_request, discussion_with_default_data):
    non_custom_section_id = to_global_id('Section', discussion_with_default_data.sections[1].id)  # Debate section
    variables = {
        'id': non_custom_section_id
    }
    res = schema.execute(u"""
mutation deleteSection($id: ID!) {
    deleteSection(
        sectionId:$id
    ) {
        success
    }
}
""", context_value=graphql_request, variable_values=variables)
    result = res.data
    assert result is not None
    assert result['deleteSection'] is not None
    assert result['deleteSection']['success'] is False


def test_mutation_update_section(sections, graphql_request):
    section_id = to_global_id('section', sections[-1].id)
    title_entries = [
        {u"value": u"Reddit", u"localeCode": u"fr"},
        {u"value": u"Reddit", u"localeCode": u"en"}
    ]
    variables = {
        'id': section_id,
        'titleEntries': title_entries,
        'order': 3.5,
        'url': 'http://www.reddit.com'
    }
    res = schema.execute(u"""
mutation updateSection($id:ID!, $titleEntries: [LangStringEntryInput], $order: Float, $url: String) {
    updateSection(
        id: $id,
        titleEntries: $titleEntries,
        url: $url,
        order: $order,
    ) {
        section {
            title(lang:"fr")
            url
            order
        }
    }
}
""", context_value=graphql_request, variable_values=variables)
    assert res.data is not None
    assert res.data['updateSection'] is not None
    assert res.data['updateSection']['section'] is not None
    section = res.data['updateSection']['section']
    assert section[u'title'] == u'Reddit'
    assert section[u'url'] == u'http://www.reddit.com'
    assert section[u'order'] == 3.5


def test_query_legal_notice(discussion, graphql_request, test_session):
    res = schema.execute(u"""query {
        legalContents {
            legalNotice(lang: "en")
        }
    }""", context_value=graphql_request)
    assert res.errors is None
    res_data = json.loads(json.dumps(res.data))
    legal_notice = res_data['legalContents']['legalNotice']
    assert legal_notice == u'We need to input the optical HDD sensor!'


def test_query_terms_and_conditions(discussion, graphql_request, test_session):
    res = schema.execute(u"""query {
        legalContents {
            termsAndConditions(lang: "en")
        }
    }""", context_value=graphql_request)
    assert res.errors is None
    res_data = json.loads(json.dumps(res.data))
    tac = res_data['legalContents']['termsAndConditions']
    assert tac == u"You can't quantify the driver without quantifying the 1080p JSON protocol!"


def test_query_legal_contents(discussion, graphql_request, test_session):
    res = schema.execute(u"""query {
        legalContents {
            legalNoticeEntries {
                localeCode
                value
            }
            termsAndConditionsEntries {
                localeCode
                value
            }
        }
    }""", context_value=graphql_request)
    assert res.errors is None
    res_data = json.loads(json.dumps(res.data))
    legal_notice_en = res_data['legalContents']['legalNoticeEntries'][0]
    tac_en = res_data['legalContents']['termsAndConditionsEntries'][0]
    tac_fr = res_data['legalContents']['termsAndConditionsEntries'][1]
    assert legal_notice_en['value'] == u"We need to input the optical HDD sensor!"
    assert legal_notice_en['localeCode'] == u"en"
    assert tac_en['value'] == u"You can't quantify the driver without quantifying the 1080p JSON protocol!"
    assert tac_en['localeCode'] == u"en"
    assert tac_fr['value'] == u"Vous ne pouvez pas mesurer le driver sans mesurer le protocole JSON en 1080p"
    assert tac_fr['localeCode'] == u"fr"


def test_update_legal_contents(graphql_request, discussion):
    res = schema.execute(u"""
mutation updateLegalContents {
    updateLegalContents(
        legalNoticeEntries: [
            {
                value: "Use the digital JBOD panel, then you can override the solid state microchip!",
                localeCode: "en"
            }
        ],
        termsAndConditionsEntries: [
            {
                value: "If we reboot the driver, we can get to the AGP protocol through the virtual HTTP bus!",
                localeCode: "en"
            }
        ]
    ) {
        legalContents {
            legalNoticeEntries {
                localeCode
                value
            }
            termsAndConditionsEntries {
                localeCode
                value
            }
        }
    }
}
""", context_value=graphql_request)
    assert res.errors is None

    assert res.data['updateLegalContents'] is not None
    assert res.data['updateLegalContents']['legalContents'] is not None

    legal_contents = res.data['updateLegalContents']['legalContents']
    legal_notice_en = legal_contents['legalNoticeEntries'][0]
    tac_en = legal_contents['termsAndConditionsEntries'][0]
    assert legal_notice_en['localeCode'] == 'en'
    assert legal_notice_en['value'] == u"Use the digital JBOD panel, then you can override the solid state microchip!"
    assert tac_en['localeCode'] == 'en'
    assert tac_en['value'] == u"If we reboot the driver, we can get to the AGP protocol through the virtual HTTP bus!"


def test_has_legal_notice(graphql_request, discussion):
    res = schema.execute(u"""query {
        hasLegalNotice(lang: "en")
    }""", context_value=graphql_request)
    assert res.errors is None
    res_data = json.loads(json.dumps(res.data))
    assert res_data['hasLegalNotice'] is True


def test_has_terms_and_conditions(graphql_request, discussion):
    res = schema.execute(u"""query {
        hasTermsAndConditions(lang: "en")
    }""", context_value=graphql_request)
    assert res.errors is None
    res_data = json.loads(json.dumps(res.data))
    assert res_data['hasTermsAndConditions'] is True


def test_query_visits_analytics(discussion, graphql_request):
    query = u"""
query GetVisitsAnalytics {
  visitsAnalytics {
    sumVisitsLength
    nbPageviews
    nbUniqPageviews
  }
}
"""
    res = schema.execute(query, context_value=graphql_request)
    assert res.data['visitsAnalytics'] is not None
    assert res.data['visitsAnalytics']['sumVisitsLength'] == None
    assert res.data['visitsAnalytics']['nbPageviews'] == None
    assert res.data['visitsAnalytics']['nbUniqPageviews'] == None


def test_query_visits_analytics_not_empty(discussion, graphql_request):
    query = u"""
query GetVisitsAnalytics {
  visitsAnalytics {
    sumVisitsLength
    nbPageviews
    nbUniqPageviews
  }
}
"""

    def mock_get_visits_time_series_analytics(self, start_date=None, end_date=None, only_fields=None):
        res = {}
        res["sum_visits_length"] = 150
        res["nb_pageviews"] = 100
        res["nb_uniq_pageviews"] = 50
        return res

    with mock.patch.object(models.Discussion, 'get_visits_time_series_analytics', mock_get_visits_time_series_analytics):
        res = schema.execute(query, context_value=graphql_request)
        assert res.data['visitsAnalytics'] is not None
        assert res.data['visitsAnalytics']['sumVisitsLength'] == 150
        assert res.data['visitsAnalytics']['nbPageviews'] == 100
        assert res.data['visitsAnalytics']['nbUniqPageviews'] == 50


def test_query_discussion_homepage(graphql_request, discussion, test_session):

    url = u"https://www.liverpoolfc.com"
    discussion.homepage_url = url
    test_session.commit()

    query = u"""
query { discussion { homepageUrl }  }
"""
    res = schema.execute(query, context_value=graphql_request)
    assert res.data['discussion']['homepageUrl'] == url


def test_query_discussion_langstring_fields(discussion, graphql_request):
    res = schema.execute(u"""query {
        discussion {
            title
            titleEntries {
                value
                localeCode
            }
            subtitle
            subtitleEntries {
                value
                localeCode
            }
            buttonLabel
            buttonLabelEntries {
                value
                localeCode
            }
        }
    }""", context_value=graphql_request)
    assert res.errors is None
    res_data = json.loads(json.dumps(res.data))

    assert res_data == {
        u'discussion': {
            u'title': u'Should we eat bananas?',
            u'titleEntries': [
                {
                    u'value': u'Should we eat bananas?',
                    u'localeCode': u'en'
                },
                {
                    u'value': u'Faut-il manger des bananes ?',
                    u'localeCode': u'fr'
                }
            ],
            u'subtitle': u'Tell me what you eat and I will tell you who you are',
            u'subtitleEntries': [
                {
                    u'value': u'Tell me what you eat and I will tell you who you are',
                    u'localeCode': u'en'
                },
                {
                    u'value': u'Dis-moi ce que tu manges et je te dirai qui tu es',
                    u'localeCode': u'fr'
                }
            ],
            u'buttonLabel': u'Discuss bananas',
            u'buttonLabelEntries': [
                {
                    u'value': u'Discuss bananas',
                    u'localeCode': u'en'
                },
                {
                    u'value': u'Discuter des bananes',
                    u'localeCode': u'fr'
                }
            ]
        }
    }


def test_mutation_update_discussion_langstring_fields(graphql_request, discussion):
    title_entry_en = u"Should we eat tomatoes?"
    title_entry_fr = u"Faut-il manger des tomates ?"
    title_entries = [
        {u"value": title_entry_en, u"localeCode": u"en"},
        {u"value": title_entry_fr, u"localeCode": u"fr"}
    ]

    subtitle_entry_en = u"By the way is it a fruit or a vegetable?"
    subtitle_entry_fr = u"D'ailleurs c'est un fruit ou un légume ?"
    subtitle_entries = [
        {u"value": subtitle_entry_en, u"localeCode": u"en"},
        {u"value": subtitle_entry_fr, u"localeCode": u"fr"}
    ]

    button_label_entry_en = u"Discuss tomatoes"
    button_label_entry_fr = u"Discuter des tomates"
    button_label_entries = [
        {u"value": button_label_entry_en, u"localeCode": u"en"},
        {u"value": button_label_entry_fr, u"localeCode": u"fr"}
    ]

    variables = {
        "titleEntries": title_entries,
        "subtitleEntries": subtitle_entries,
        "buttonLabelEntries": button_label_entries
    }
    res = schema.execute(u"""
mutation myFirstMutation(
    $titleEntries: [LangStringEntryInput!]!,
    $subtitleEntries: [LangStringEntryInput!]!,
    $buttonLabelEntries: [LangStringEntryInput!]!
) {
    updateDiscussion(
        titleEntries: $titleEntries
        subtitleEntries: $subtitleEntries
        buttonLabelEntries: $buttonLabelEntries
    ) {
        discussion {
            id
            title
            titleEntries {
                value
                localeCode
            }
            subtitle
            subtitleEntries {
                value
                localeCode
            }
            buttonLabel
            buttonLabelEntries {
                value
                localeCode
            }
        }
    }
}
""", context_value=graphql_request, variable_values=variables)
    result = res.data
    assert result is not None
    assert result['updateDiscussion'] is not None
    discussion = result['updateDiscussion']['discussion']

    assert discussion['title'] == title_entry_en
    assert discussion['titleEntries'] == title_entries

    assert discussion['subtitle'] == subtitle_entry_en
    assert discussion['subtitleEntries'] == subtitle_entries

    assert discussion['buttonLabel'] == button_label_entry_en
    assert discussion['buttonLabelEntries'] == button_label_entries


def test_query_discussion_landing_page_image_fields(
        discussion, graphql_request, graphql_registry, test_session, simple_file, moderator_user):

    from assembl.models.attachment import DiscussionAttachment
    from assembl.models import AttachmentPurpose

    LANDING_PAGE_HEADER_IMAGE = AttachmentPurpose.LANDING_PAGE_HEADER_IMAGE.value
    LANDING_PAGE_LOGO_IMAGE = AttachmentPurpose.LANDING_PAGE_LOGO_IMAGE.value

    header_image = DiscussionAttachment(
        discussion=discussion,
        document=simple_file,
        title=u"Landing page header image",
        creator=moderator_user,
        attachmentPurpose=LANDING_PAGE_HEADER_IMAGE
    )

    logo_image = DiscussionAttachment(
        discussion=discussion,
        document=simple_file,
        title=u"Landing page logo image",
        creator=moderator_user,
        attachmentPurpose=LANDING_PAGE_LOGO_IMAGE
    )

    discussion.db.flush()

    res = schema.execute(
        graphql_registry['LandingPage'],
        context_value=graphql_request,
        variable_values={"lang": u"en"})
    assert res.errors is None
    res_data = json.loads(json.dumps(res.data))
    res_discussion = res_data['discussion']
    assert res_discussion['headerImage']['mimeType'] == u'image/png'
    assert '/documents/' in res_discussion['headerImage']['externalUrl']
    assert res_discussion['logoImage']['mimeType'] == u'image/png'
    assert '/documents/' in res_discussion['logoImage']['externalUrl']

    discussion.db.delete(header_image)
    discussion.db.delete(logo_image)
    discussion.db.flush()


def test_update_discussion_landing_page_image_fields(graphql_request, graphql_registry, discussion):
    import os
    from io import BytesIO

    class FieldStorage(object):
        file = BytesIO(os.urandom(16))

        def __init__(self, filename, type):
            self.filename = filename
            self.type = type

    graphql_request.POST['variables.headerImage'] = FieldStorage(
        u'path/to/new-img.png', 'image/png')
    graphql_request.POST['variables.logoImage'] = FieldStorage(
        u'path/to/new-img2.png', 'image/png')

    res = schema.execute(
        graphql_registry['updateDiscussion'],
        context_value=graphql_request,
        variable_values={
            "headerImage": u"variables.headerImage",
            "logoImage": u"variables.logoImage",
            "titleEntries": [{
                "localeCode": "en",
                "value": "My title"
            }],
            "subtitleEntries": [{
                "localeCode": "en",
                "value": "My subtitle"
            }],
            "buttonLabelEntries": [{
                "localeCode": "en",
                "value": "My button label"
            }]
        })

    assert res.data is not None
    assert res.data['updateDiscussion'] is not None
    assert res.data['updateDiscussion']['discussion'] is not None

    res_discussion = res.data['updateDiscussion']['discussion']

    assert res_discussion['headerImage'] is not None
    assert '/documents/' in res_discussion['headerImage']['externalUrl']
    assert res_discussion['headerImage']['mimeType'] == 'image/png'

    assert res_discussion['logoImage'] is not None
    assert '/documents/' in res_discussion['logoImage']['externalUrl']
    assert res_discussion['logoImage']['mimeType'] == 'image/png'

    assert res_discussion['titleEntries'][0]['value'] == u'My title'
    assert res_discussion['subtitleEntries'][0]['value'] == u'My subtitle'
    assert res_discussion['buttonLabelEntries'][0]['value'] == u'My button label'


def test_get_all_posts(graphql_request, proposition_id):
    from assembl.graphql.schema import Schema as schema
    res = schema.execute(
        u"""query Posts($contentLocale: String!, $startDate: String, $endDate: String,  $identifiers: [String]) {
            posts(startDate: $startDate, endDate: $endDate, identifiers: $identifiers) {
                edges {
                  node {
                    ... on Post {
                      id
                      dbId
                      discussionId
                      type
                      creationDate
                      publicationState
                      subject(lang: $contentLocale)
                      body(lang: $contentLocale)
                      parentId
                      creator {
                        id
                      }
                      indirectIdeaContentLinks {
                        ideaId
                        postId
                      }
                    }
                  }
                }
              }
            }
        """,
        context_value=graphql_request,
        variable_values={
            "contentLocale": "fr",
            "identifiers": ["survey"]
        })
    assert res.data
    assert len(res.data['posts']['edges']) == 1
    first_post = res.data['posts']['edges'][0]['node']
    assert proposition_id == first_post['id']
    return res


def test_query_discussion_login_url_default(graphql_request, discussion, test_session, graphql_registry):
    res = schema.execute(graphql_registry['DiscussionQuery'], context_value=graphql_request)
    from assembl.lib.frontend_urls import FrontendUrls
    furl = FrontendUrls(discussion)
    expected_url = furl.get_frontend_url("ctxLogin")
    assert expected_url == res.data['discussion']['loginData']['url']
    assert res.data['discussion']['loginData']['local'], "The default login URL is local"


def test_query_discussion_login_url_different_nextview(graphql_request, discussion, test_session, graphql_registry):
    next_view = '/my/next/site'
    res = schema.execute(graphql_registry['DiscussionQuery'], context_value=graphql_request, variable_values={"nextView": next_view})
    from assembl.lib.frontend_urls import FrontendUrls
    furl = FrontendUrls(discussion)
    expected_url = furl.append_query_string(furl.get_frontend_url("ctxLogin"), next=next_view)
    assert expected_url == res.data['discussion']['loginData']['url']
    assert res.data['discussion']['loginData']['local'], "The default login URL is local"


def test_query_discussion_login_url_non_local(graphql_request, discussion, test_session, graphql_registry):
    preferences = discussion.preferences
    old_pref_auth = preferences['authorization_server_backend']
    old_pref_landing_page = preferences['landing_page']
    # Ensure testing.ini has the a fake shibboleth saml providor in SOCIAL_AUTH_SAML_ENABLED_IDPS
    preferences['authorization_server_backend'] = preferences.preference_data['authorization_server_backend']['scalar_values']['saml:test_shib']
    preferences['landing_page'] = True
    test_session.flush()

    res = schema.execute(graphql_registry['DiscussionQuery'], context_value=graphql_request)
    _query = {'idp': 'test_shib'}
    expected_url = graphql_request.route_url(
        "contextual_social.auth",
        discussion_slug=discussion.slug,
        backend='saml',
        _query=_query)
    assert expected_url == res.data['discussion']['loginData']['url']
    assert not res.data['discussion']['loginData']['local'], "A remote SAML login should not be a local URL"
    preferences['authorization_server_backend'] = old_pref_auth
    preferences['landing_page'] = old_pref_landing_page
    test_session.flush()
